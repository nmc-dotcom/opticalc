import { UnitConverterConfig } from '../converterEngine';

export const angleConfig: UnitConverterConfig = {
  id: 'conv-angle',
  title: '각도 변환기',
  description: '도(deg)와 라디안(rad), 그라디안(grad) 등 기하학 표준 삼각법 각도를 환산합니다.',
  category: 'converter',
  subCategory: '단위변환',
  icon: 'Compass',
  baseUnit: 'rad',
  units: [
    { value: 'rad', label: '라디안', ratio: 1.0 },
    { value: 'deg', label: '도', ratio: 0.017453292519943295 },
    { value: 'grad', label: '그라디안', ratio: 0.015707963267948967 },
  ],
};
