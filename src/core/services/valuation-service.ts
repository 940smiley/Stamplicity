import type { ValuationRequest, ValuationResult, StampData } from '../types.js';
import { GeminiStampService } from '../ai/gemini-service.js';

export interface ValuationService {
  identifyAndValueStamp(request: ValuationRequest): Promise<ValuationResult>;
  identifyStamp(imageData: string): Promise<StampData>;
}

export class PhilatelyValuationService implements ValuationService {
  private aiService: GeminiStampService;

  constructor(aiService: GeminiStampService) {
    this.aiService = aiService;
  }

  async identifyAndValueStamp(request: ValuationRequest): Promise<ValuationResult> {
    return await this.aiService.identifyAndValueStamp(request);
  }

  async identifyStamp(imageData: string): Promise<StampData> {
    return await this.aiService.identifyStamp(imageData);
  }

  // Future enhancement: Add catalog lookup integration
  async identifyWithCatalogLookup(imageData: string): Promise<ValuationResult> {
    const result = await this.identifyAndValueStamp({ imageData });

    // TODO: Integrate with catalog service for enhanced accuracy
    // const catalogMatch = await this.catalogService.findMatch(result);
    // if (catalogMatch) {
    //   result.catalogReference = catalogMatch;
    // }

    return result;
  }
}

// Factory function for easy setup
export function createValuationService(apiKey: string) {
  const aiService = new GeminiStampService({
    apiKey,
    model: 'gemini-2.5-flash',
    temperature: 0.1,
    maxTokens: 1000
  });

  return new PhilatelyValuationService(aiService);
}
