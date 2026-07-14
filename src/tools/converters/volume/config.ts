import { UnitConverterConfig } from '../converterEngine';

export const volumeConfig: UnitConverterConfig = {
  id: 'conv-volume',
  title: '부피 변환기',
  description: '밀리리터(ml)부터 세제곱미터(㎥), 갤런(gal) 등 입체적 체적 단위를 환산합니다.',
  category: 'converter',
  subCategory: '단위변환',
  icon: 'CupSoda',
  baseUnit: 'L',
  units: [
    { value: 'ml', label: '밀리리터', ratio: 0.001 },
    { value: 'L', label: '리터', ratio: 1.0 },
    { value: 'cm3', label: '세제곱센티미터 (cc)', ratio: 0.001 },
    { value: 'm3', label: '세제곱미터', ratio: 1000.0 },
    { value: 'gal', label: '갤런 (US)', ratio: 3.785411 },
    { value: 'qt', label: '쿼터 (US)', ratio: 0.946353 },
  ],
};
