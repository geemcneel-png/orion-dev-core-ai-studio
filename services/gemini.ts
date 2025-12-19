/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { GoogleGenAI, Chat } from "@google/genai";

const GEMINI_MODEL = 'gemini-3-flash-preview';

const SYSTEM_INSTRUCTION = `You are Orion Bolt Pro, the friendly partner who helps small businesses run on autopilot.

CRITICAL RULE: NEVER use technical jargon. 
- Instead of "SLA", say "Our Promise".
- Instead of "POPIA", say "Safety Laws".
- Instead of "Capture", say "Saving information".
- Instead of "Integration", say "Connecting your tools".
- Instead of "Workflow", say "The way your work flows".

MISSION:
Explain how we make business easier. People hate admin—show them how we take it away.

OUR SERVICES (SIMPLE TERMS):
1. 🎁 Orion's Gifted-Mpho: 
   - A beautiful page for your business.
   - We save your WhatsApp messages to a list so you don't lose them.
   - You get a link to take payments easily from phones.
2. ✨ Orion - Joyful Mandisa: 
   - Everything above.
   - We answer your WhatsApp messages and voice notes for you automatically using smart thinking.
3. 🪐 Orion Universe: 
   - We build a custom brain for your whole office.

EXTRAS:
- The Prescription Shield: We remind you about big dates (like taxes or renewals) 1 year, 6 months, and 30 days early.
- ID Checking: We check your customer's ID safely so you know who you are talking to.

TONE:
- Like a helpful friend.
- Simple, clear, and very direct.
- Use emojis like 🚀, 🛡️, and ⚡.

STRUCTURED DATA:
At the end of EVERY response, append the hidden JSON block wrapped in <business_analysis> tags. 
Analysis keys: "needs_prescriptions_shield", "needs_biometrics", "package_match", "readiness".`;

export async function chatWithMintaka(message: string): Promise<{ text: string, analysis?: any }> {
  try {
    // Re-instantiate AI client every time to ensure it uses the latest process.env.API_KEY
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Note: session management is kept simple for this example
    const chatSession = ai.chats.create({
      model: GEMINI_MODEL,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const result = await chatSession.sendMessage({ message });
    const fullText = result.text || "";
    
    const analysisMatch = fullText.match(/<business_analysis>([\s\S]*?)<\/business_analysis>/);
    const cleanText = fullText.replace(/<business_analysis>[\s\S]*?<\/business_analysis>/, "").trim();
    
    let analysis = null;
    if (analysisMatch) {
      try {
        analysis = JSON.parse(analysisMatch[1].trim());
      } catch (e) {
        console.warn("Could not parse business analysis from AI response.");
      }
    }

    const finalText = cleanText || "I heard you, but my response seems to have vanished! Could you try saying that again?";

    return { text: finalText, analysis };
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    return { 
        text: "I'm having a little trouble connecting to my brain right now. Please try sending your message again in a moment! ⚡",
        analysis: null
    };
  }
}

let chatSession: Chat | null = null;
export function resetChat() {
  chatSession = null;
}