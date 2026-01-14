
import { GoogleGenAI, Type } from "@google/genai";
import { Profile, MatchMode, UserVibe } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const PROFILE_SCHEMA = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.STRING },
      handle: { type: Type.STRING },
      name: { type: Type.STRING },
      avatar: { 
        type: Type.STRING,
        description: "A high-quality Unsplash portrait URL of a real person. Format: https://images.unsplash.com/photo-[ID]?auto=format&fit=crop&q=80&w=400&h=400. Must be a high-resolution human face."
      },
      vibeTags: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      },
      matchReason: { 
        type: Type.STRING, 
        description: "A short, sharp, and slightly cynical reason for the match. Max 12 words." 
      },
      tweets: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            content: { type: Type.STRING },
            timestamp: { type: Type.STRING },
            likes: { type: Type.STRING },
            retweets: { type: Type.STRING }
          },
          required: ["id", "content", "timestamp", "likes", "retweets"]
        }
      }
    },
    required: ["id", "handle", "name", "avatar", "vibeTags", "tweets", "matchReason"]
  }
};

export async function fetchMatches(vibe: UserVibe, mode: MatchMode): Promise<Profile[]> {
  const prompt = `
    Act as a "Social Graph Weapon" discovery engine for an elite network. 
    Match the user in ${mode} mode based on these intellectual obsessions: "${vibe.keywords}".
    
    Generate 5 fictional but extremely realistic X (Twitter) profiles.
    
    CRITICAL INSTRUCTIONS:
    - AVATARS: You MUST provide valid Unsplash photo URLs for portraits of real people. Use portraits that feel "X-like" (professional, high-signal).
    - TWEETS: High-IQ, punchy, slightly controversial or deeply technical observations. Use industry slang (AGI, p99, LTV, gm).
    - REASON: A sharp neural link discovery. 
    
    Return the data in a JSON array.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: PROFILE_SCHEMA,
      },
    });

    const parsed = JSON.parse(response.text);
    
    // Curated high-quality diverse portrait fallbacks from Unsplash
    const fallbacks = [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb", // Female portrait
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", // Male portrait
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6", // Male portrait
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2", // Female portrait
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d", // Male portrait
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04", // Female portrait
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e", // Male portrait
    ];

    return parsed.map((p: any, idx: number) => {
      let avatar = p.avatar || "";
      
      // Strict validation: must be a string and contain Unsplash domain
      const isValidUnsplash = typeof avatar === 'string' && avatar.includes('images.unsplash.com');
      
      if (!isValidUnsplash) {
        avatar = fallbacks[idx % fallbacks.length];
      }
      
      // Ensure high-quality crop parameters are appended correctly
      const baseUrl = avatar.split('?')[0];
      avatar = `${baseUrl}?auto=format&fit=crop&q=80&w=400&h=400`;

      return { 
        ...p, 
        mode,
        avatar
      };
    });
  } catch (error) {
    console.error("Error generating matches:", error);
    return [];
  }
}
