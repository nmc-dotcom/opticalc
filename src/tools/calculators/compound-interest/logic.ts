export interface CompoundInterestResult {
  principal: number;
  simpleInterest: number;
  simpleTotal: number;
  compoundInterest: number;
  compoundTotal: number;
  difference: number;
  yearlyData: { year: number; simple: number; compound: number }[];
}

export type CompoundFrequency = 'annual' | 'monthly';

/**
 * 복리 및 단리 자산 증식을 시뮬레이션합니다.
 * @param principal 초기 투자 원금
 * @param rateAnnual 연이율 (%, 예: 5)
 * @param years 투자 기간 (년 단위)
 * @param frequency 복리 주기 ('annual' 연복리, 'monthly' 월복리)
 */
export function calculateCompoundInterest(
  principal: number,
  rateAnnual: number,
  years: number,
  frequency: CompoundFrequency
): CompoundInterestResult {
  const r = rateAnnual / 100;
  
  // 1. 단리 계산 (Simple Interest)
  // 총액 = P * (1 + r * t)
  const simpleTotal = Math.round(principal * (1 + r * years));
  const simpleInterest = simpleTotal - principal;

  // 2. 복리 계산 (Compound Interest)
  // 연복리 총액 = P * (1 + r)^t
  // 월복리 총액 = P * (1 + r/12)^(12 * t)
  let compoundTotal = principal;
  if (frequency === 'annual') {
    compoundTotal = Math.round(principal * Math.pow(1 + r, years));
  } else {
    compoundTotal = Math.round(principal * Math.pow(1 + r / 12, 12 * years));
  }
  const compoundInterest = compoundTotal - principal;
  const difference = compoundTotal - simpleTotal;

  // 연도별 축적 데이터 생성 (시각화 또는 리스트용)
  const yearlyData = [];
  for (let y = 1; y <= years; y++) {
    const ySimple = Math.round(principal * (1 + r * y));
    let yCompound = principal;
    if (frequency === 'annual') {
      yCompound = Math.round(principal * Math.pow(1 + r, y));
    } else {
      yCompound = Math.round(principal * Math.pow(1 + r / 12, 12 * y));
    }
    yearlyData.push({
      year: y,
      simple: ySimple,
      compound: yCompound,
    });
  }

  return {
    principal,
    simpleInterest,
    simpleTotal,
    compoundInterest,
    compoundTotal,
    difference,
    yearlyData,
  };
}
