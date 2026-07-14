import { TaxType } from '../saving/logic';

export interface DepositResult {
  principal: number;
  grossInterest: number;
  taxAmount: number;
  netInterest: number;
  netTotal: number;
}

/**
 * 정기예금 만기 원리금을 산출합니다.
 * @param principal 거치 원금 (원)
 * @param rateAnnual 연이율 (%, 예: 3.5)
 * @param termMonths 거치 기간 (개월)
 * @param taxType 세금 종류
 */
export function calculateDeposit(
  principal: number,
  rateAnnual: number,
  termMonths: number,
  taxType: TaxType
): DepositResult {
  const r = rateAnnual / 100;
  
  // 예금 세전 이자 산출: 원금 * 연이율 * (기간/12)
  const grossInterest = Math.round(principal * r * (termMonths / 12));

  // 세율 결정
  let taxRate = 0.154; // 일반과세 15.4%
  if (taxType === 'preferential') {
    taxRate = 0.095; // 세금우대 9.5%
  } else if (taxType === 'free') {
    taxRate = 0; // 비과세 0%
  }

  const taxAmount = Math.round(grossInterest * taxRate);
  const netInterest = grossInterest - taxAmount;
  const netTotal = principal + netInterest;

  return {
    principal,
    grossInterest,
    taxAmount,
    netInterest,
    netTotal,
  };
}
