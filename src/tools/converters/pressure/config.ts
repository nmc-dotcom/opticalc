import { UnitConverterConfig } from '../converterEngine';

export const pressureConfig: UnitConverterConfig = {
  id: 'conv-pressure',
  title: '압력 변환기',
  description: '파스칼(Pa)부터 킬로파스칼(kPa), 바(bar), 대기압(atm), 프사이(psi)를 정밀 환산합니다.',
  category: 'converter',
  subCategory: '단위변환',
  icon: 'Compass',
  baseUnit: 'Pa',
  units: [
    { value: 'Pa', label: '파스칼', ratio: 1.0 },
    { value: 'kPa', label: '킬로파스칼', ratio: 1000.0 },
    { value: 'bar', label: '바', ratio: 100000.0 },
    { value: 'psi', label: '프사이 (평방인치당 파운드)', ratio: 6894.75729 },
    { value: 'atm', label: '기압 (표준대기압)', ratio: 101325.0 },
  ],
};
