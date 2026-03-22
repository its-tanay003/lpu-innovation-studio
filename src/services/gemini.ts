import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";

// Lazy initialization to avoid crashing if key is missing
let ai: GoogleGenAI | null = null;

const getAI = () => {
  if (!ai) {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not configured");
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

// 1. AI Powered Chatbot (NOVA)
export const chatWithNova = async (message: string, history: any[] = []) => {
  const genAI = getAI();
  const chat = genAI.chats.create({
    model: "gemini-3.1-pro-preview",
    config: {
      systemInstruction: "You are NOVA (Neural Operations and Ventures Assistant), the official AI for LPU Innovation Studio. You have deep knowledge about the 50,000 sq ft facility, its 9 specialized labs (Ideation, AI, Student Project, Prototyping, Machine Diagnostic, Fabrication, Metal Casting, Paint Booth, Machining), and elite clubs like REDDIX and ASTRA. Be technical, encouraging, and precise. Use Orbitron font vibes in your tone.",
    },
  });

  const response = await chat.sendMessage({ message });
  return response.text;
};

// 2. Image Generation (Nano Banana Pro)
export const generateImage = async (prompt: string, size: "1K" | "2K" | "4K" = "1K", aspectRatio: string = "1:1") => {
  const genAI = getAI();
  const response = await genAI.models.generateContent({
    model: 'gemini-3.1-flash-image-preview',
    contents: {
      parts: [{ text: prompt }],
    },
    config: {
      imageConfig: {
        aspectRatio,
        imageSize: size,
      },
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

// 3. Video Generation (Veo 3)
export const generateVideo = async (prompt: string, aspectRatio: "16:9" | "9:16" = "16:9") => {
  const genAI = getAI();
  let operation = await genAI.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt,
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio
    }
  });

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await genAI.operations.getVideosOperation({ operation });
  }

  return operation.response?.generatedVideos?.[0]?.video?.uri;
};

// 4. Image Analysis
export const analyzeImage = async (base64Image: string, mimeType: string) => {
  const genAI = getAI();
  const response = await genAI.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType } },
        { text: "Analyze this image for technical details, engineering components, and innovation potential." }
      ]
    }
  });
  return response.text;
};

// 5. Thinking Mode (Complex Queries)
export const thinkDeeply = async (prompt: string) => {
  const genAI = getAI();
  const response = await genAI.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: prompt,
    config: { 
      thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH } 
    }
  });
  return response.text;
};

// 6. TTS
export const generateSpeech = async (text: string) => {
  const genAI = getAI();
  const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text }] }],
    config: {
      responseModalities: ["AUDIO"],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Kore' },
        },
      },
    },
  });

  return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
};
