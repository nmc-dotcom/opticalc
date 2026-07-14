import { UnitConverterConfig } from '../converterEngine';

export const dataConfig: UnitConverterConfig = {
  id: 'conv-data',
  title: '데이터 용량 변환기',
  description: '바이트(B)부터 테라바이트(TB), 페타바이트(PB)까지 컴퓨터 규격 이진 데이터 용량을 환산합니다.',
  category: 'converter',
  subCategory: '단위변환',
  icon: 'Database',
  baseUnit: 'B',
  units: [
    { value: 'B', label: '바이트', ratio: 1.0 },
    { value: 'KB', label: '킬로바이트', ratio: 1024.0 },
    { value: 'MB', label: '메가바이트', ratio: 1048576.0 },
    { value: 'GB', label: '기가바이트', ratio: 1073741824.0 },
    { value: 'TB', label: '테라바이트', ratio: 1099511627776.0 },
    { value: 'PB', label: '페타바이트', ratio: 1125899906842624.0 },
  ],
};
