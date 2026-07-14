import { UnitConverterConfig } from '../converterEngine';

export const timeConfig: UnitConverterConfig = {
  id: 'conv-time',
  title: '시간 변환기',
  description: '밀리초(ms)부터 초, 분, 시간, 일, 주, 평년(yr) 단위까지 정밀 산정합니다.',
  category: 'converter',
  subCategory: '단위변환',
  icon: 'Clock',
  baseUnit: 's',
  units: [
    { value: 'ms', label: '밀리초', ratio: 0.001 },
    { value: 's', label: '초', ratio: 1.0 },
    { value: 'm', label: '분', ratio: 60.0 },
    { value: 'h', label: '시간', ratio: 3600.0 },
    { value: 'd', label: '일', ratio: 86400.0 },
    { value: 'wk', label: '주', ratio: 604800.0 },
    { value: 'yr', label: '년 (365일)', ratio: 31536000.0 },
  ],
};
