
import { GoogleGenAI } from "@google/genai";
import { Campaign, SpendingRecord, AuditReport } from "../types";

const getAIClient = () => {
  if (!process.env.API_KEY) {
    console.error("API_KEY not found in environment");
    return null;
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateAuditReport = async (campaign: Campaign): Promise<AuditReport | null> => {
  const ai = getAIClient();
  if (!ai) return null;

  const spendingJson = JSON.stringify(campaign.spendingHistory);
  const prompt = `
    You are an expert financial auditor for a transparent blockchain charity.
    Analyze the following campaign and its spending history.
    
    Campaign Title: ${campaign.title}
    Campaign Description: ${campaign.description}
    Total Raised: $${campaign.raisedAmount}
    Target: $${campaign.targetAmount}
    
    Spending Records (JSON):
    ${spendingJson}

    Please provide a transparency audit in JSON format with the following keys:
    - score: A number between 0 and 100 indicating trust level.
    - summary: A 2-sentence summary of how funds are being used.
    - riskAnalysis: A short paragraph identifying any potential misuse or inefficiencies (or praise for efficiency).
    - efficiencyRating: A string (e.g., "High", "Medium", "Low").
    
    Ensure the tone is professional and objective.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AuditReport;
    }
    return null;
  } catch (error) {
    console.error("Error generating audit report:", error);
    return null;
  }
};

export const generateImpactInsight = async (campaignTitle: string): Promise<string> => {
  const ai = getAIClient();
  if (!ai) return "AI unavailable.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Write a very short, inspiring 1-sentence storytelling prediction of the impact of donating to: "${campaignTitle}". Speak directly to a hero donor.`,
    });
    return response.text || "Together we can make a change.";
  } catch (e) {
    return "Impact data currently unavailable.";
  }
};
