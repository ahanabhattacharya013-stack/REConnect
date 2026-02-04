export interface Property {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  price: number;
  priceHistory: { month: string; price: number }[];
  rentalYield: number;
  vacancyRate: number;
  appreciation: number;
  marketStability: number;
  riskScore: number;
  opportunityScore: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  propertyType: 'Residential' | 'Commercial' | 'Industrial' | 'Retail';
  area: number;
  bedrooms?: number;
  amenities: string[];
  description: string;
  imageUrl?: string;
}

export interface InvestorProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  budgetMin: number;
  budgetMax: number;
  riskTolerance: 'Conservative' | 'Balanced' | 'Aggressive';
  investmentGoal: 'Rental Income' | 'Capital Appreciation';
  timeline: 5 | 10 | 20;
  preferredLocations: string[];
  preferredPropertyTypes: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface MatchResult {
  property: Property;
  matchScore: number;
  category: 'best-fit' | 'medium-fit' | 'high-risk';
  reasons: string[];
}

export interface DealContext {
  projectType: 'sale' | 'lease' | 'investment' | 'market-overview' | 'strategy';
  description: string;
  audience: 'institutional' | 'corporate' | 'internal' | 'senior-partners';
  objective: 'maximize-valuation' | 'win-mandate' | 'recommend-strategy' | 'explain-opportunity';
  assumptions: {
    rentGrowth: number;
    holdingPeriod: number;
    riskTolerance: 'low' | 'medium' | 'high';
  };
}

export interface Settings {
  language: string;
  theme: 'dark' | 'light' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    shareData: boolean;
    analytics: boolean;
    marketing: boolean;
  };
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}
