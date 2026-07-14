import { ExchangeRateProvider, RateResult, RatesResult } from './ExchangeRateProvider';

interface CachedData {
  rates: Record<string, number>;
  timestamp: number;
}

const CACHE_EXPIRY_MS = 45 * 60 * 1000; // 45분 캐싱

// API가 실패하거나 오프라인 상태일 때 사용할 안전한 기본 백업 환율 (기준: USD) 
const FALLBACK_USD_RATES: Record<string, number> = {
  USD: 1.0,
  KRW: 1380.0,
  EUR: 0.92,
  JPY: 158.0,
  CNY: 7.25,
  GBP: 0.78,
  AUD: 1.48,
  CAD: 1.36,
  CHF: 0.89,
};

export class FrankfurterProvider implements ExchangeRateProvider {
  private baseUrl = 'https://api.frankfurter.dev/v1';

  async getRates(from: string): Promise<RatesResult> {
    const cacheKey = `exchange_rates_${from}`;
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      try {
        const parsed: CachedData = JSON.parse(cached);
        const now = Date.now();
        if (now - parsed.timestamp < CACHE_EXPIRY_MS) {
          console.log(`[FrankfurterProvider] 환율 캐시 히트 (${from})`);
          return { rates: parsed.rates, isFallback: false };
        }
      } catch (e) {
        console.error('캐시 파싱 에러:', e);
      }
    }

    try {
      console.log(`[FrankfurterProvider] API 호출 (${from})`);
      const response = await fetch(`${this.baseUrl}/latest?from=${from}`);
      if (!response.ok) {
        throw new Error(`API 응답 오류: ${response.status}`);
      }
      const data = await response.json();
      const rates = data.rates || {};

      // 자기 자신과의 환율은 항상 1.0
      rates[from] = 1.0;

      const cacheData: CachedData = {
        rates,
        timestamp: Date.now(),
      };
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
      return { rates, isFallback: false };
    } catch (error) {
      console.error('[FrankfurterProvider] API 호출 실패, Fallback 적용:', error);

      // 만약 기준 통화가 USD라면 준비된 Fallback을, 아니면 비례 계산 적용
      if (from === 'USD') {
        return { rates: FALLBACK_USD_RATES, isFallback: true };
      } else {
        // 기준 통화 USD fallback으로부터 역산
        const baseInUsd = FALLBACK_USD_RATES[from];
        if (baseInUsd) {
          const derivedRates: Record<string, number> = {};
          Object.keys(FALLBACK_USD_RATES).forEach((currency) => {
            derivedRates[currency] = FALLBACK_USD_RATES[currency] / baseInUsd;
          });
          return { rates: derivedRates, isFallback: true };
        }
      }
      return { rates: { [from]: 1.0 }, isFallback: true };
    }
  }

  async getRate(from: string, to: string): Promise<RateResult> {
    if (from === to) return { rate: 1.0, isFallback: false };
    const { rates, isFallback } = await this.getRates(from);
    return { rate: rates[to] || 0, isFallback };
  }
}
