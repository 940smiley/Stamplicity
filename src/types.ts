// Enhanced philatelic item types for Stamplicity application  
  
export type ItemCategory =  
  | 'stamp'  
  | 'first-day-cover'  
  | 'cachet'  
  | 'postal-history'  
  | 'aerial-postal-cover'  
  | 'war-cover'  
  | 'postcard'  
  | 'postal-stationery'  
  | 'proof'  
  | 'essai'  
  | 'revenue'  
  | 'other';  
  
export type Grade =  
  | 'mint'  
  | 'near-mint'  
  | 'very-fine'  
  | 'fine'  
  | 'good'  
  | 'fair'  
  | 'poor'  
  | 'unknown';  
  
export type SalesRecommendation =  
  | 'buy-it-now'  
  | 'auction-lot'  
  | 'hold'  
  | 'research-needed';  
  
export interface EnhancedStampData {  
  // Basic info  
  name: string;  
  country: string;  
  year: string;  
  description: string;  
  
  // Enhanced classification  
  category: ItemCategory;  
  subCategory?: string;  
  printRun?: string;  
  setNumber?: string;  
  
  // Grading  
  grade: Grade;  
  conditionNotes?: string;  
  
  // Valuation  
  estimatedValue: string;  
  valueSource?: string; // Source of the estimated value (e.g., Colnect, eBay, etc.)  
  
  // Sales recommendations  
  salesRecommendation: SalesRecommendation;  
  salesJustification: string;  
  recommendedForLot?: boolean; // Whether this item should be grouped with others for auction  
  lotGroupId?: string; // Group ID if recommended for a specific lot  
}  
  
export interface StampLogEntry {  
  id: number;  
  timestamp: Date;  
  itemId: string;  
  scanResult: EnhancedStampData;  
  accepted: boolean;  
}  
  
export interface Stamp extends EnhancedStampData {  
  id: number;  
  imageUrl: string;  
}  
  
export type SortBy = 'date' | 'name' | 'country' | 'value' | 'category';  
