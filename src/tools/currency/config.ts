import { ToolConfig } from '../types';

export const currencyConfig: ToolConfig = {
  id: 'currency-converter',
  title: '실시간 환율 계산기',
  description: '세계 주요 통화의 실시간 환율을 조회하고 즉시 변환합니다.',
  category: 'currency',
  subCategory: '환율',
  icon: 'RefreshCw',
  faq: [
    {
      question: '환율 정보는 얼마나 자주 업데이트되나요?',
      answer: 'Frankfurter API를 기반으로 실시간 최신 환율 정보를 호출하며, 네트워크 부하 최소화를 위해 브라우저에서 45분간 자동 캐싱을 진행합니다.',
    },
    {
      question: '오프라인 상태나 API 장애 시에도 작동하나요?',
      answer: '네, 네트워크 연결이 끊기거나 외부 API 서버 장애 시에도 마지막 캐시값 또는 내장된 최신 표준 환율 데이터(Fallback)를 활용하여 상시 안전하게 계산할 수 있습니다.',
    },
  ],
  examples: [
    {
      title: '달러에서 원화로 변환',
      scenario: '미국 100달러를 원화로 환산할 때',
      result: '현재 환율에 기반하여 대략 138,000원(시장 환율 기준)으로 즉시 변환됩니다.',
    },
  ],
};
