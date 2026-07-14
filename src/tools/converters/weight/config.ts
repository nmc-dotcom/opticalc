import { UnitConverterConfig } from '../converterEngine';

export const weightConfig: UnitConverterConfig = {
  id: 'conv-weight',
  title: '무게 변환기',
  description: '밀리그램(mg)부터 톤(t), 야드파운드 단위까지 정밀하게 상호 매핑합니다.',
  category: 'converter',
  subCategory: '단위변환',
  icon: 'Scale',
  baseUnit: 'g',
  units: [
    { value: 'mg', label: '밀리그램', ratio: 0.001 },
    { value: 'g', label: '그램', ratio: 1.0 },
    { value: 'kg', label: '킬로그램', ratio: 1000.0 },
    { value: 't', label: '톤', ratio: 1000000.0 },
    { value: 'oz', label: '온스', ratio: 28.349523 },
    { value: 'lb', label: '파운드', ratio: 453.59237 },
  ],
};
