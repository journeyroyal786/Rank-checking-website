export type Keyword = { keyword: string; position: number | null; volume: number | null; cpc: number | null; url?: string; difficulty?: number | null };
export type TrafficMonth = { month: string; organic: number; paid: number; total: number };
export type SeoReport = {
  domain: string; generatedAt: string; mode: 'live' | 'demo'; provider: string;
  estimatedOrganicTraffic: number | null; estimatedPaidTraffic: number | null;
  organicKeywords: number | null; paidKeywords: number | null; backlinks: number | null; referringDomains: number | null;
  monthlyTraffic: TrafficMonth[]; topKeywords: Keyword[]; competitors: { domain: string; sharedKeywords?: number; estimatedTraffic?: number }[];
  trafficSources: { name: string; value: number; estimated: boolean }[];
  notes: string[];
};
