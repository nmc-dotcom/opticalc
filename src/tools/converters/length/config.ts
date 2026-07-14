import { UnitConverterConfig } from '../converterEngine';

export const lengthConfig: UnitConverterConfig = {
  id: 'conv-length',
  title: '길이 변환기',
  description: '밀리미터(mm)부터 마일(mile)까지 동서양 표준 길이 단위를 자유로이 환산합니다.',
  category: 'converter',
  subCategory: '단위변환',
  icon: 'Ruler',
  baseUnit: 'm',
  units: [
    { value: 'mm', label: '밀리미터', ratio: 0.001 },
    { value: 'cm', label: '센티미터', ratio: 0.01 },
    { value: 'm', label: '미터', ratio: 1.0 },
    { value: 'km', label: '킬로미터', ratio: 1000.0 },
    { value: 'in', label: '인치', ratio: 0.0254 },
    { value: 'ft', label: '피트', ratio: 0.3048 },
    { value: 'yd', label: '야드', ratio: 0.9144 },
    { value: 'mile', label: '마일', ratio: 1609.344 },
  ],
};
