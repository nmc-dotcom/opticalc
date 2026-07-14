import { ToolConfig } from '../../types';

export const discountConfig: ToolConfig = {
  id: 'calc-discount',
  title: '할인율 계산기',
  description: '원가와 할인율을 기반으로 최종 할인가와 절약 금액을 실시간으로 확인합니다.',
  category: 'calculator',
  subCategory: '생활',
  icon: 'Tag',
  faq: [
    {
      question: '추가 할인(더블 할인)도 한 번에 계산할 수 있나요?',
      answer: '본 계산기는 기본 1차 할인율 산출 기능을 기본 제공하며, 할인액과 세이브 비용을 즉각 원 단위로 상호 대조해 드립니다.',
    },
  ],
  examples: [
    {
      title: '55,000원 의류 35% 할인 적용',
      scenario: '55,000원 가격표 상품에 35% 세일이 붙었을 때',
      result: '절약 금액은 19,250원이며, 최종 할인가 35,750원에 즉각 도달합니다.',
    },
  ],
};
