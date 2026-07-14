import { FrankfurterProvider } from './providers/FrankfurterProvider';

const provider = new FrankfurterProvider();

export const currencyList = [
  { code: 'KRW', name: '대한민국 원 (₩)', symbol: '₩' },
  { code: 'USD', name: '미국 달러 ($)', symbol: '$' },
  { code: 'EUR', name: '유럽 유로 (€)', symbol: '€' },
  { code: 'JPY', name: '일본 엔 (¥)', symbol: '¥' },
  { code: 'CNY', name: '중국 위안 (元)', symbol: '元' },
  { code: 'GBP', name: '영국 파운드 (£)', symbol: '£' },
  { code: 'AUD', name: '호주 달러 (A$)', symbol: 'A$' },
  { code: 'CAD', name: '캐나다 달러 (C$)', symbol: 'C$' },
  { code: 'CHF', name: '스위스 프랑 (CHF)', symbol: 'CHF' },
];

export interface ConversionResult {
  fromAmount: number;
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  convertedAmount: number;
  isFallback: boolean;
}

export async function convertCurrency(
  amount: number,
  from: string,
  to: string
): Promise<ConversionResult> {
  if (amount <= 0) {
    return { fromAmount: amount, fromCurrency: from, toCurrency: to, rate: 1, convertedAmount: 0, isFallback: false };
  }

  const { rate, isFallback } = await provider.getRate(from, to);
  let convertedAmount = amount * rate;

  return {
    fromAmount: amount,
    fromCurrency: from,
    toCurrency: to,
    rate,
    convertedAmount,
    isFallback,
  };
}
