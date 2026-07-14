export type TaxType = 'normal' | 'preferential' | 'free';

export interface SavingResult {
  totalPrincipal: number;
  grossInterest: number;
  taxAmount: number;
  netInterest: number;
  netTotal: number;
}

/**
 * 정기적금 만기 원리금을 산출합니다.
 * @param monthlyDeposit 매월 납입액 (원)
 * @param rateAnnual 연이율 (%, 예: 3.5)
 * @param termMonths 납입 기간 (개월)
 * @param taxType 세금 종류
 */
export function calculateSaving(
  monthlyDeposit: number,
  rateAnnual: number,
  termMonths: number,
  taxType: TaxType
): SavingResult {
  const totalPrincipal = monthlyDeposit * termMonths;
  const rateMonthly = (rateAnnual / 100) / 12;

  // 적금 세전 이자 산출: 원금 * 월이율 * n(n+1)/2
  let grossInterest = 0;
  if (rateMonthly > 0) {
    grossInterest = Math.round(monthlyDeposit * rateMonthly * (termMonths * (termMonths + 1)) / 2);
  }

  // 세율 결정
  let taxRate = 0.154; // 일반과세 15.4%
  if (taxType === 'preferential') {
    taxRate = 0.095; // 세금우대 9.5%
  } else if (taxType === 'free') {
    taxRate = 0; // 비과세 0%
  }

  const taxAmount = Math.round(grossInterest * taxRate);
  const netInterest = grossInterest - taxAmount;
  const netTotal = totalPrincipal + netInterest;

  return {
    totalPrincipal,
    grossInterest,
    taxAmount,
    netInterest,
    netTotal,
  };
}
