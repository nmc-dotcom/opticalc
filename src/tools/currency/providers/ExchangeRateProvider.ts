export interface RatesResult {
  rates: Record<string, number>;
  isFallback: boolean;
}

export interface RateResult {
  rate: number;
  isFallback: boolean;
}

export interface ExchangeRateProvider {
  getRates(from: string): Promise<RatesResult>;
  getRate(from: string, to: string): Promise<RateResult>;
}
