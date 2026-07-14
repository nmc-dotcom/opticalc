export interface BmiResult {
  bmi: number;
  status: string;
  colorClass: string; // Tailwind 텍스트/배경 컬러
  minHealthyWeight: number;
  maxHealthyWeight: number;
}

/**
 * BMI(체질량지수)를 산출합니다.
 * @param heightCm 신장 (cm)
 * @param weightKg 체중 (kg)
 */
export function calculateBmi(heightCm: number, weightKg: number): BmiResult {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  let status = '정상';
  let colorClass = 'text-green-600 bg-green-50 border-green-200';

  if (bmi < 18.5) {
    status = '저체중';
    colorClass = 'text-blue-600 bg-blue-50 border-blue-200';
  } else if (bmi >= 18.5 && bmi < 23) {
    status = '정상';
    colorClass = 'text-green-600 bg-green-50 border-green-200';
  } else if (bmi >= 23 && bmi < 25) {
    status = '과체중';
    colorClass = 'text-yellow-600 bg-yellow-50 border-yellow-200';
  } else if (bmi >= 25 && bmi < 30) {
    status = '경도 비만';
    colorClass = 'text-orange-600 bg-orange-50 border-orange-200';
  } else {
    status = '고도 비만';
    colorClass = 'text-red-600 bg-red-50 border-red-200';
  }

  // 표준 적정 체중 가이드라인 (정상 범위: BMI 18.5 ~ 22.9)
  const minHealthyWeight = Math.round(18.5 * (heightM * heightM) * 10) / 10;
  const maxHealthyWeight = Math.round(22.9 * (heightM * heightM) * 10) / 10;

  return {
    bmi: Math.round(bmi * 100) / 100,
    status,
    colorClass,
    minHealthyWeight,
    maxHealthyWeight,
  };
}
