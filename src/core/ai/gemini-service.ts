import { GoogleGenAI, Type } from '@google/genai';
import type { StampData, ValuationRequest, ValuationResult, AIServiceConfig } from '../types.js';

export class GeminiStampService {
  private ai: GoogleGenAI;
  private config: AIServiceConfig;

  constructor(config: AIServiceConfig) {
    this.config = config;
    this.ai = new GoogleGenAI({ apiKey: config.apiKey });
  }

  private getSchema() {
    return {
      type: Type.OBJECT,
      properties: {
        name: {
          type: Type.STRING,
          description: 'The official name or title of the stamp (e.g., "Inverted Jenny").'
        },
        country: {
          type: Type.STRING,
          description: 'The country of origin for the stamp (e.g., "United States").'
        },
        year: {
          type: Type.STRING,
          description: 'The estimated year or range the stamp was issued (e.g., "1918").'
        },
        description: {
          type: Type.STRING,
          description: 'A brief, one-paragraph description of the stamp, its history, and any notable features.'
        },
        estimatedValue: {
          type: Type.STRING,
          description: 'An estimated eBay auction value range, considering common conditions (e.g., "$5 - $10" or "$100+").'
        },
        auctionType: {
          type: Type.STRING,
          description: 'The recommended eBay auction type. Must be exactly "Singular Auction" or "Lot Auction".'
        },
        justification: {
          type: Type.STRING,
          description: 'A brief, one-sentence reason for the auction type recommendation, explaining why it is high or low value.'
        },
      },
      required: ['name', 'country', 'year', 'description', 'estimatedValue', 'auctionType', 'justification']
    };
  }

  async identifyAndValueStamp(request: ValuationRequest): Promise<ValuationResult> {
    try {
      const model = this.ai.models.getModel(this.config.model || 'gemini-2.5-flash');

      const prompt = `You are an expert philatelist and stamp valuation specialist. Analyze this stamp image and provide detailed identification and valuation information.

${request.additionalContext ? `Additional context: ${request.additionalContext}` : ''}
${request.condition ? `Stamp condition: ${request.condition}` : ''}

Please identify the stamp and provide:
1. Official name/title
2. Country of origin
3. Year of issue
4. Historical description
5. Estimated auction value range
6. Recommended auction type (Singular Auction for high-value stamps, Lot Auction for common stamps)
7. Brief justification for the auction type recommendation

Be precise and professional in your analysis.`;

      const response = await model.generateContent({
        contents: {
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: 'image/jpeg',
                data: request.imageData
              }
            }
          ]
        },
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: this.getSchema(),
          temperature: this.config.temperature || 0.1,
          maxOutputTokens: this.config.maxTokens || 1000,
        }
      });

      const result = response.response;
      const stampData: StampData = JSON.parse(result.text());

      return {
        ...stampData,
        confidence: 0.85, // Could be enhanced with actual confidence scoring
      };

    } catch (error) {
      throw new Error(`Stamp identification failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async identifyStamp(imageData: string): Promise<StampData> {
    const result = await this.identifyAndValueStamp({ imageData });
    return result;
  }
}

// Factory function for easy instantiation
export function createGeminiStampService(apiKey: string, config?: Partial<AIServiceConfig>): GeminiStampService {
  return new GeminiStampService({
    apiKey,
    model: 'gemini-2.5-flash',
    temperature: 0.1,
    maxTokens: 1000,
    ...config
  });
}
