import { UnitConverterConfig } from '../converterEngine';

export const temperatureConfig: UnitConverterConfig = {
  id: 'conv-temperature',
  title: '온도 변환기',
  description: '섭씨(℃), 화씨(℉), 절대온도(K) 체계를 상호 수식에 맞추어 완벽 환산합니다.',
  category: 'converter',
  subCategory: '단위변환',
  icon: 'Thermometer',
  baseUnit: 'C',
  units: [
    { value: 'C', label: '섭씨온도', ratio: 1.0 },
    { value: 'F', label: '화씨온도', ratio: 1.0 },
    { value: 'K', label: '절대온도', ratio: 1.0 },
  ],
  customFormula: (value: number, from: string, to: string): number => {
    if (from === to) return value;
    
    // 우선 섭씨(C)로 일원화 후 대상 단위로 변환하는 우아한 2단계 파이프라인
    let c = 0;
    if (from === 'C') {
      c = value;
    } else if (from === 'F') {
      c = (value - 32) / 1.8;
    } else if (from === 'K') {
      c = value - 273.15;
    }

    if (to === 'C') {
      return c;
    } else if (to === 'F') {
      return c * 1.8 + 32;
    } else if (to === 'K') {
      return c + 273.15;
    }
    return value;
  },
};
