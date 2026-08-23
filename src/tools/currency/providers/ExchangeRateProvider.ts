export interface RatesResult {
  rates: Record<string, number>;
  isFallback: boolean;
  asOf?: string;
  source?: string;
}

export interface RateResult {
  rate: number;
  isFallback: boolean;
  asOf?: string;
  source?: string;
}

export interface ExchangeRateProvider {
  getRates(from: string): Promise<RatesResult>;
  getRate(from: string, to: string): Promise<RateResult>;
}
