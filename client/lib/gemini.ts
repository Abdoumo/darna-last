import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyAK69PPj590q6nGNThpXPoFXKn63EX8vEE";
const genAI = new GoogleGenerativeAI(API_KEY);

export async function getChatResponse(userMessage: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(userMessage);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Sorry, I encountered an error. Please try again.";
  }
}
