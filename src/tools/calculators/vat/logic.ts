export interface VatResult {
  supplyValue: number;
  vatValue: number;
  totalValue: number;
}

/**
 * 공급가액 기준으로 부가세와 합계금액을 계산합니다.
 */
export function calculateFromSupply(supply: number, ratePercent: number): VatResult {
  const rate = ratePercent / 100;
  const vatValue = Math.round(supply * rate);
  const totalValue = supply + vatValue;

  return {
    supplyValue: supply,
    vatValue,
    totalValue,
  };
}

/**
 * 합계금액(소비자가) 기준으로 공급가액과 부가세를 역산합니다.
 */
export function calculateFromTotal(total: number, ratePercent: number): VatResult {
  const rate = ratePercent / 100;
  // 공급가액 = 합계금액 / (1 + 세율)
  const supplyValue = Math.round(total / (1 + rate));
  const vatValue = total - supplyValue;

  return {
    supplyValue,
    vatValue,
    totalValue: total,
  };
}
