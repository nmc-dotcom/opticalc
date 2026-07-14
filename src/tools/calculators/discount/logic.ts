export interface DiscountResult {
  originalPrice: number;
  discountRate: number;
  discountAmount: number;
  finalPrice: number;
}

/**
 * 할인 금액과 최종 가격을 계산합니다.
 * @param originalPrice 원가 (원)
 * @param discountRate 할인율 (%)
 */
export function calculateDiscount(originalPrice: number, discountRate: number): DiscountResult {
  const rate = Math.min(100, Math.max(0, discountRate)) / 100;
  const discountAmount = Math.round(originalPrice * rate);
  const finalPrice = originalPrice - discountAmount;

  return {
    originalPrice,
    discountRate,
    discountAmount,
    finalPrice,
  };
}
