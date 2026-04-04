import { GoogleGenAI, Type } from '@google/genai';
import type { EnhancedStampData } from '../types';

if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Updated schema to match the EnhancedStampData structure
const schema = {
  type: Type.OBJECT,
  properties: {
    name: {
      type: Type.STRING,
      description: 'The official name or title of the philatelic item.'
    },
    country: {
      type: Type.STRING,
      description: 'The country or region of origin for the item.'
    },
    year: {
      type: Type.STRING,
      description: 'The estimated year or range the item was issued or produced.'
    },
    description: {
      type: Type.STRING,
      description: 'A detailed description of the item, its significance, and any notable features.'
    },
    category: {
      type: Type.STRING,
      description: 'The category of the item. Must be exactly "stamp", "first-day-cover", "cachet", "postal-history", "aerial-postal-cover", "war-cover", "postcard", "postal-stationery", "proof", "essai", "revenue", or "other".'
    },
    subCategory: {
      type: Type.STRING,
      description: 'Additional subcategorization (e.g., definitives, commemoratives, booklet panes, etc.)'
    },
    printRun: {
      type: Type.STRING,
      description: 'Estimated print run or limited edition size if known.'
    },
    setNumber: {
      type: Type.STRING,
      description: 'Set or series number if applicable.'
    },
    grade: {
      type: Type.STRING,
      description: 'Condition grade. Must be one of: "mint", "near-mint", "very-fine", "fine", "good", "fair", "poor", "unknown".'
    },
    conditionNotes: {
      type: Type.STRING,
      description: 'Specific notes about the condition, cancellation marks, or defects.'
    },
    estimatedValue: {
      type: Type.STRING,
      description: 'An estimated eBay auction value range, considering current market data from Colnect, HipStamp, DelCampe, eBay and other sources (e.g., "$5 - $10" or "$100+").'
    },
    valueSource: {
      type: Type.STRING,
      description: 'Source of the valuation data (e.g., Colnect, HipStamp, DelCampe, eBay, etc.)'
    },
    salesRecommendation: {
      type: Type.STRING,
      description: 'Recommended sales approach. Must be exactly "buy-it-now", "auction-lot", "hold", or "research-needed".'
    },
    salesJustification: {
      type: Type.STRING,
      description: 'Brief reason for the sales recommendation based on item characteristics and market demand.'
    },
    recommendedForLot: {
      type: Type.BOOLEAN,
      description: 'Whether this item should be grouped with others for auction lots.'
    },
    lotGroupId: {
      type: Type.STRING,
      description: 'Identifier for the lot group if this item is recommended for grouping with others.'
    }
  },
  required: ['name', 'country', 'year', 'description', 'category', 'grade', 'estimatedValue', 'salesRecommendation', 'salesJustification']
};

export async function identifyAndValueStamp(base64Image: string): Promise<EnhancedStampData> {
  try {
    const model = ai.models.getModel('gemini-2.5-flash');

    const prompt = `Analyze this philatelic item image. Identify and categorize it (stamp, first day cover, postcard, cachet, etc.), provide its details, and recommend the best sales strategy based on current market values from Colnect, HipStamp, DelCampe, eBay and other reputable sources.

    Respond with a JSON object matching the provided schema. Include category, grade, and sales recommendation.`;

    const result = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image,
            },
          },
        ],
      }],
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: schema,
      },
    });

    const jsonString = result.response.text();
    const stampData: EnhancedStampData = JSON.parse(jsonString);

    return stampData;

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    if (error instanceof Error) {
      throw new Error(`Gemini API request failed: ${error.message}`);
    }
    throw new Error('An unknown error occurred while communicating with the Gemini API.');
  }
}
