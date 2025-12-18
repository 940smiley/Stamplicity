// Core philately types - consolidated from multiple repositories

export interface StampData {
  name: string;
  country: string;
  year: string;
  description: string;
  estimatedValue: string;
  auctionType: 'Singular Auction' | 'Lot Auction' | string;
  justification: string;
}

export interface Stamp extends StampData {
  id: number;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface StampCatalogEntry {
  id: string;
  name: string;
  country: string;
  year: string;
  catalogNumber?: string;
  faceValue?: string;
  description?: string;
  historicalValue?: string;
  rarity?: 'Common' | 'Scarce' | 'Rare' | 'Very Rare' | 'Extremely Rare';
  condition?: 'Mint' | 'Very Fine' | 'Fine' | 'Good' | 'Poor';
}

export interface ValuationRequest {
  imageData: string; // base64 encoded image
  condition?: string;
  additionalContext?: string;
}

export interface ValuationResult extends StampData {
  confidence: number;
  alternativeMatches?: StampData[];
  catalogReference?: StampCatalogEntry;
}

export type SortBy = 'date' | 'name' | 'country' | 'value';
export type SortOrder = 'asc' | 'desc';

// AI Service types
export interface AIServiceConfig {
  apiKey: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AIIdentificationRequest {
  imageData: string;
  prompt?: string;
  context?: string;
}

export interface AIIdentificationResponse {
  success: boolean;
  data?: StampData;
  error?: string;
  confidence?: number;
}