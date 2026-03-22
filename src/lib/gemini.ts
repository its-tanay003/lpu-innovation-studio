import { GoogleGenAI } from '@google/genai';

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not defined in environment variables');
}

export const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getModel = (modelName: string = 'gemini-3.1-pro-preview') => {
  return genAI.models.getGenerativeModel({ model: modelName });
};
