import { ExchangeRateProvider, RateResult, RatesResult } from './ExchangeRateProvider';

interface CachedData {
  rates: Record<string, number>;
  timestamp: number;
}

const CACHE_EXPIRY_MS = 12 * 60 * 60 * 1000; // Frankfurter는 하루 1회(중부유럽시간 16시경) 갱신되므로 12시간 캐싱

// API가 실패하거나 오프라인 상태일 때 사용할 안전한 기본 백업 환율 (기준: USD)
// 값 기준일: 2026-08-23 — 값을 갱신할 때는 이 날짜도 함께 갱신할 것
const FALLBACK_RATES_AS_OF = '2026-08-23';
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
      return { rates: this.getFallbackRates(from), isFallback: true, fallbackAsOf: FALLBACK_RATES_AS_OF };
    }
  }

  // 기준 통화가 USD라면 준비된 Fallback을, 아니면 USD 기준값으로부터 비례 계산해서 역산
  private getFallbackRates(from: string): Record<string, number> {
    if (from === 'USD') {
      return FALLBACK_USD_RATES;
    }
    const baseInUsd = FALLBACK_USD_RATES[from];
    if (baseInUsd) {
      const derivedRates: Record<string, number> = {};
      Object.keys(FALLBACK_USD_RATES).forEach((currency) => {
        derivedRates[currency] = FALLBACK_USD_RATES[currency] / baseInUsd;
      });
      return derivedRates;
    }
    return { [from]: 1.0 };
  }

  async getRate(from: string, to: string): Promise<RateResult> {
    if (from === to) return { rate: 1.0, isFallback: false };
    const { rates, isFallback, fallbackAsOf } = await this.getRates(from);
    const rate = rates[to];
    if (rate !== undefined) {
      return { rate, isFallback, fallbackAsOf };
    }

    // 실시간 응답에 대상 통화가 없는 경우, 0을 반환하지 않고 백업 환율로 전환
    if (!isFallback) {
      const fallbackRates = this.getFallbackRates(from);
      const fallbackRate = fallbackRates[to];
      if (fallbackRate !== undefined) {
        return { rate: fallbackRate, isFallback: true, fallbackAsOf: FALLBACK_RATES_AS_OF };
      }
    }

    throw new Error(`지원하지 않는 통화 조합입니다: ${from} → ${to}`);
  }
}
