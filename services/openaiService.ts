
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const generateHairstyleImageOpenAI = async (prompt: string, image?: { base64Data: string; mimeType: string; }) => {
  if (image) {
    // OpenAI API doesn't directly support base64 image input for variations in the same way.
    // This would require a more complex setup, potentially using image URLs or a different endpoint.
    // For this example, we'll focus on text-to-image generation.
    throw new Error('Image reference with OpenAI is not supported in this version.');
  }

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  });

  const imageUrl = response.data[0].url;
  if (!imageUrl) {
    throw new Error('Failed to generate image with OpenAI.');
  }

  // DALL-E returns a URL. We need to fetch it and convert to base64 to have a consistent return type.
  const imageResponse = await fetch(imageUrl);
  const imageBlob = await imageResponse.blob();
  const reader = new FileReader();
  return new Promise<string>((resolve, reject) => {
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(imageBlob);
  });
};
