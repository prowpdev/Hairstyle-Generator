
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Using a placeholder. App will not function correctly without a valid key.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "YOUR_API_KEY_HERE" });

interface ImagePayload {
  base64Data: string;
  mimeType: string;
}

export const generateHairstyleImage = async (prompt: string, image?: ImagePayload): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash-image';
    
    const textPart = {
      text: image 
        ? `Using the provided reference photo of a person, change their hairstyle to: ${prompt}. Maintain the person's facial features and background as much as possible.`
        : `Generate a photorealistic image of a person with the following hairstyle: ${prompt}. The image should be high-quality, focused on the hair, with a neutral studio background.`
    };

    const parts: any[] = [textPart];

    if (image) {
      const imagePart = {
        inlineData: {
          data: image.base64Data,
          mimeType: image.mimeType,
        },
      };
      // For multi-modal prompts, it's often best to provide the image first.
      parts.unshift(imagePart);
    }
    
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: parts,
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64EncodeString: string = part.inlineData.data;
        return `data:${part.inlineData.mimeType};base64,${base64EncodeString}`;
      }
    }
    
    throw new Error("No image data found in the API response.");

  } catch (error) {
    console.error("Error generating image with Gemini API:", error);
    throw new Error("Failed to generate hairstyle image. Please try again later.");
  }
};
