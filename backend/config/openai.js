// import OpenAI from "openai";
// import dotenv from "dotenv";
// dotenv.config();
// const openai = new OpenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

// export default openai;

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// Initialize the Google Generative AI with your API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Export the model configuration
// We use 'gemini-1.5-flash' because it's fast and free for development
export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });