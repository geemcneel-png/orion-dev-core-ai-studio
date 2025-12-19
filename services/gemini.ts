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
    // FIX: Provide a default system prompt if context is missing
    const systemPrompt = context || "You are Mintaka, the helpful AI partner for Orion Dev Core. Keep your answers professional and concise.";

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      systemInstruction: systemPrompt,
    });

    if (!chatSession) {
      chatSession = model.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.8, // Slightly higher for better flow
        },
      });
    }

    const result = await chatSession.sendMessage(message);
    const response = await result.response;
    
    // FIX: Verify text exists before trying to read it
    if (!response || !response.text()) {
      throw new Error("Empty AI Response");
    }

    return { text: response.text(), analysis: null };
  } catch (error) {
    console.error("Mintaka Brain Error:", error);
    // Rethrowing so Chat.tsx can show the alert
    throw error;
  }
};
