
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

export const getBusinessInsights = async (stats: any) => {
  if (!API_KEY) return "AI Insights unavailable. Please configure API_KEY.";
  
  try {
    // Re-initialize to ensure latest key/context as per guidelines
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Analyze this food delivery platform business data and provide 3 concise bullet points for the admin dashboard.
        Current Stats:
        - Monthly Revenue: ${stats.monthlyRevenue.toLocaleString()} VND
        - Daily Revenue: ${stats.dailyRevenue.toLocaleString()} VND
        - Active Users: ${stats.activeUsers}
        - Total Restaurants: ${stats.totalRestaurants}
        
        Focus on growth opportunities or risk flags. Keep it professional and helpful.
      `,
    });
    
    return response.text;
  } catch (error: any) {
    console.error("Gemini Error:", error);
    // Specifically handle the 404 error if it persists
    if (error?.message?.includes('404') || error?.message?.includes('NOT_FOUND')) {
      return "Model or resource not found. Please verify the model name or API configuration.";
    }
    return "Error generating insights. Please try again later.";
  }
};
