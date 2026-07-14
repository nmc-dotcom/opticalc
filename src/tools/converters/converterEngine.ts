export interface Unit {
  value: string;
  label: string;
  ratio: number; // 기준 단위 대비 비율
}

export interface UnitConverterConfig {
  id: string;
  title: string;
  description: string;
  category: 'converter';
  subCategory: '단위변환';
  icon: string;
  baseUnit: string; // 기준이 되는 단위 코드 (예: 'm')
  units: Unit[];
  customFormula?: (value: number, from: string, to: string) => number; // 곱셈으로 안되는 특수 공식 (온도 등)
}

/**
 * 표준 단위 변환 로직
 */
export function convertUnits(
  value: number,
  from: string,
  to: string,
  config: UnitConverterConfig
): number {
  // 1. 특수 공식 우선 적용 (온도 등 - 0이 고정점이 아닌 어파인 변환 포함)
  if (config.customFormula) {
    return config.customFormula(value, from, to);
  }

  if (value === 0) return 0;

  // 2. 표준 곱셈 비율 적용
  const fromUnit = config.units.find((u) => u.value === from);
  const toUnit = config.units.find((u) => u.value === to);

  if (!fromUnit || !toUnit) return 0;

  // 기준 단위(Base Unit)로 변환: value * fromUnit.ratio
  const valueInBase = value * fromUnit.ratio;
  // 기준 단위에서 타겟 단위로 변환: valueInBase / toUnit.ratio
  return valueInBase / toUnit.ratio;
}
