import { ToolRegistryItem } from './types';

// 1. 환율
import { CurrencyConverter } from './currency/component';
import { currencyConfig } from './currency/config';

// 2. 금융 계산기
import { VatCalculator } from './calculators/vat/component';
import { vatConfig } from './calculators/vat/config';
import { LoanCalculator } from './calculators/loan/component';
import { loanConfig } from './calculators/loan/config';
import { CompoundInterestCalculator } from './calculators/compound-interest/component';
import { compoundInterestConfig } from './calculators/compound-interest/config';
import { SavingCalculator } from './calculators/saving/component';
import { savingConfig } from './calculators/saving/config';
import { DepositCalculator } from './calculators/deposit/component';
import { depositConfig } from './calculators/deposit/config';

// 3. 생활 계산기
import { DiscountCalculator } from './calculators/discount/component';
import { discountConfig } from './calculators/discount/config';
import { BmiCalculator } from './calculators/bmi/component';
import { bmiConfig } from './calculators/bmi/config';
import { AreaCalculator } from './calculators/area/component';
import { areaConfig } from './calculators/area/config';

// 4. 날짜 계산기
import { DdayCalculator } from './calculators/dday/component';
import { ddayConfig } from './calculators/dday/config';
import { AgeCalculator } from './calculators/age/component';
import { ageConfig } from './calculators/age/config';

// 5. 단위 변환기
import { LengthConverter } from './converters/length/component';
import { lengthConfig } from './converters/length/config';
import { WeightConverter } from './converters/weight/component';
import { weightConfig } from './converters/weight/config';
import { AreaConverter } from './converters/area/component';
import { areaConvConfig } from './converters/area/config';
import { VolumeConverter } from './converters/volume/component';
import { volumeConfig } from './converters/volume/config';
import { TemperatureConverter } from './converters/temperature/component';
import { temperatureConfig } from './converters/temperature/config';
import { SpeedConverter } from './converters/speed/component';
import { speedConfig } from './converters/speed/config';
import { TimeConverter } from './converters/time/component';
import { timeConfig } from './converters/time/config';
import { DataConverter } from './converters/data/component';
import { dataConfig } from './converters/data/config';
import { PressureConverter } from './converters/pressure/component';
import { pressureConfig } from './converters/pressure/config';
import { AngleConverter } from './converters/angle/component';
import { angleConfig } from './converters/angle/config';

export const toolRegistry: ToolRegistryItem[] = [
  // 환율
  { config: currencyConfig, component: CurrencyConverter },

  // 금융 계산기
  { config: vatConfig, component: VatCalculator },
  { config: loanConfig, component: LoanCalculator },
  { config: compoundInterestConfig, component: CompoundInterestCalculator },
  { config: savingConfig, component: SavingCalculator },
  { config: depositConfig, component: DepositCalculator },

  // 생활 계산기
  { config: discountConfig, component: DiscountCalculator },
  { config: bmiConfig, component: BmiCalculator },
  { config: areaConfig, component: AreaCalculator },

  // 날짜 계산기
  { config: ddayConfig, component: DdayCalculator },
  { config: ageConfig, component: AgeCalculator },

  // 단위 변환기
  { config: lengthConfig, component: LengthConverter },
  { config: weightConfig, component: WeightConverter },
  { config: areaConvConfig, component: AreaConverter },
  { config: volumeConfig, component: VolumeConverter },
  { config: temperatureConfig, component: TemperatureConverter },
  { config: speedConfig, component: SpeedConverter },
  { config: timeConfig, component: TimeConverter },
  { config: dataConfig, component: DataConverter },
  { config: pressureConfig, component: PressureConverter },
  { config: angleConfig, component: AngleConverter },
];

/**
 * ID 기반으로 도구를 탐색합니다.
 */
export function getToolById(id: string): ToolRegistryItem | undefined {
  return toolRegistry.find((item) => item.config.id === id);
}

/**
 * 카테고리별로 도구를 필터링합니다.
 */
export function getToolsByCategory(category: 'calculator' | 'converter' | 'currency') {
  return toolRegistry.filter((item) => item.config.category === category);
}
