import { UnitConverterConfig } from '../converterEngine';

export const speedConfig: UnitConverterConfig = {
  id: 'conv-speed',
  title: '속도 변환기',
  description: '초속(m/s)부터 시속(km/h), 미국식 마일속도(mph), 해상 노트(knot)를 상호 변환합니다.',
  category: 'converter',
  subCategory: '단위변환',
  icon: 'Zap',
  baseUnit: 'm/s',
  units: [
    { value: 'm/s', label: '미터 매 초', ratio: 1.0 },
    { value: 'km/h', label: '킬로미터 매 시', ratio: 0.27777778 },
    { value: 'mph', label: '마일 매 시', ratio: 0.44704 },
    { value: 'knot', label: '노트', ratio: 0.514444 },
  ],
};
