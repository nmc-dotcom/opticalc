import { UnitConverterConfig } from '../converterEngine';

export const areaConvConfig: UnitConverterConfig = {
  id: 'conv-area',
  title: '면적 변환기',
  description: '제곱미터(㎡)에서 헥타르(ha), 전통 평(坪)까지 부동산 및 토지 단위를 환산합니다.',
  category: 'converter',
  subCategory: '단위변환',
  icon: 'Maximize',
  baseUnit: 'm2',
  units: [
    { value: 'm2', label: '제곱미터', ratio: 1.0 },
    { value: 'a', label: '아르', ratio: 100.0 },
    { value: 'ha', label: '헥타르', ratio: 10000.0 },
    { value: 'km2', label: '제곱킬로미터', ratio: 1000000.0 },
    { value: 'py', label: '평', ratio: 3.305785 },
  ],
};
