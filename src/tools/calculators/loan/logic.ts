export interface LoanScheduleItem {
  month: number;
  payment: number;      // 월 상환금
  principal: number;    // 상환 원금
  interest: number;     // 납부 이자
  remaining: number;    // 잔금
}

export interface LoanResult {
  totalInterest: number;
  totalPayment: number;
  averageMonthly: number;
  firstMonthPayment: number;
  schedule: LoanScheduleItem[];
}

export type RepaymentType = 'equalPrincipalInterest' | 'equalPrincipal' | 'maturity';

/**
 * 대출 상환 정보를 계산합니다.
 * @param principal 원금 (원 단위)
 * @param rateAnnual 연이율 (%, 예: 5.2)
 * @param termMonths 대출 기간 (개월 단위)
 * @param type 상환 방식
 */
export function calculateLoan(
  principal: number,
  rateAnnual: number,
  termMonths: number,
  type: RepaymentType
): LoanResult {
  const rateMonthly = (rateAnnual / 100) / 12;
  const schedule: LoanScheduleItem[] = [];
  let remaining = principal;
  let totalInterest = 0;

  if (type === 'equalPrincipalInterest') {
    // 원리금균등상환액 공식: P * r * (1 + r)^n / ((1 + r)^n - 1)
    let monthlyPayment = 0;
    if (rateMonthly === 0) {
      monthlyPayment = principal / termMonths;
    } else {
      monthlyPayment = (principal * rateMonthly * Math.pow(1 + rateMonthly, termMonths)) /
                       (Math.pow(1 + rateMonthly, termMonths) - 1);
    }

    for (let m = 1; m <= termMonths; m++) {
      const interest = remaining * rateMonthly;
      const roundedInterest = Math.round(interest);
      const roundedPayment = Math.round(monthlyPayment);
      const repaymentPrincipal = m === termMonths ? remaining : (roundedPayment - roundedInterest);
      remaining -= repaymentPrincipal;

      totalInterest += roundedInterest;
      schedule.push({
        month: m,
        payment: repaymentPrincipal + roundedInterest,
        principal: repaymentPrincipal,
        interest: roundedInterest,
        remaining: Math.max(0, remaining),
      });
    }
  } else if (type === 'equalPrincipal') {
    // 원금균등상환: 원금은 매달 일정, 이자는 잔액 기준
    const monthlyPrincipal = Math.round(principal / termMonths);
    for (let m = 1; m <= termMonths; m++) {
      const repaymentPrincipal = m === termMonths ? remaining : monthlyPrincipal;
      const interest = remaining * rateMonthly;
      const roundedInterest = Math.round(interest);
      remaining -= repaymentPrincipal;

      totalInterest += roundedInterest;
      schedule.push({
        month: m,
        payment: repaymentPrincipal + roundedInterest,
        principal: repaymentPrincipal,
        interest: roundedInterest,
        remaining: Math.max(0, remaining),
      });
    }
  } else {
    // 만기일시상환: 매달 이자만 내고, 마지막 달에 원금 일시 상환
    for (let m = 1; m <= termMonths; m++) {
      const interest = remaining * rateMonthly;
      const roundedInterest = Math.round(interest);
      const repaymentPrincipal = m === termMonths ? principal : 0;
      if (m === termMonths) {
        remaining = 0;
      }

      totalInterest += roundedInterest;
      schedule.push({
        month: m,
        payment: repaymentPrincipal + roundedInterest,
        principal: repaymentPrincipal,
        interest: roundedInterest,
        remaining,
      });
    }
  }

  const totalPayment = principal + totalInterest;
  const averageMonthly = Math.round(totalPayment / termMonths);
  const firstMonthPayment = schedule[0]?.payment || 0;

  return {
    totalInterest,
    totalPayment,
    averageMonthly,
    firstMonthPayment,
    schedule,
  };
}
