import { ToolConfig } from '../../types';

export const compoundInterestConfig: ToolConfig = {
  id: 'calc-compound-interest',
  title: '복리 계산기',
  description: '원금과 거치 기간, 연이율에 따른 복리 효과와 자산 증식 경로를 실시간으로 추적합니다.',
  category: 'calculator',
  subCategory: '금융',
  icon: 'LineChart',
  faq: [
    {
      question: '단리와 복리의 근본적 차이는 무엇인가요?',
      answer: '단리는 오직 초기 원금에 대해서만 이자가 붙는 반면, 복리는 발생한 이자가 다시 원금에 가산되어 새로운 이자를 낳는 자산 스노우볼 효과를 발생시킵니다.',
    },
    {
      question: '적립식 복리도 계산 가능한가요?',
      answer: '본 계산기는 거치식 예금 자산의 단리 대비 복리 가치 변화를 시뮬레이션하며, 연복리 및 월복리 옵션을 모두 지원합니다.',
    },
  ],
  examples: [
    {
      title: '1,000만원 10년 거치 (연복리 6%)',
      scenario: '10,000,000원을 연 6% 복리로 10년간 장기 저축했을 때',
      result: '10년 후 만기 금액은 약 17,908,477원이며, 단리식 계산 대비 1,908,477원의 보너스 수익이 창출됩니다.',
    },
  ],
};
