/**
 * ORION DEV CORE - AI BRAIN (MINTAKA)
 * STATUS: OPTIMIZED | ENGINE: GEMINI 1.5 PRO
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

// Replace with your actual API Key if not using environment variables
const genAI = new GoogleGenerativeAI("AIzaSyClhNIz0kTpbw2nSt-LBi-0rUcIaq64rVM");

let chatSession: any = null;

/**
 * Main Chat Function
 * @param message - What the user typed
 * @param context - The "Secret Whisper" from the Google Sheet (aiPrompt)
 */
export const chatWithMintaka = async (message: string, context: string = "") => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      // This is where we feed the AI the "Briefing" about the partner
      systemInstruction: context || "You are Mintaka, the helpful AI partner for Orion Dev Core.",
    });

    if (!chatSession) {
      chatSession = model.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7, // Keeps her witty but accurate
        },
      });
    }

    const result = await chatSession.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    // We return it in the format Chat.tsx expects
    return {
      text: text,
      analysis: null // We can add smart analysis later!
    };
  } catch (error) {
    console.error("Mintaka Brain Error:", error);
    throw error;
  }
};

export const resetChat = () => {
  chatSession = null;
};
