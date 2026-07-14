import { ToolConfig } from '../../types';

export const vatConfig: ToolConfig = {
  id: 'calc-vat',
  title: '부가세 계산기',
  description: '공급가액이나 합계금액을 기반으로 세액과 총액을 상호 역산하고 즉시 파악합니다.',
  category: 'calculator',
  subCategory: '금융',
  icon: 'Receipt',
  faq: [
    {
      question: '부가세 포함(과세)과 부가세 별도의 차이는 무엇인가요?',
      answer: '부가세 포함은 최종 소비자가 지불하는 총합 금액에서 공급가액과 10% 부가세를 역산하는 방식이며, 부가세 별도는 원금에 10%를 더해 총액을 산출하는 방식입니다.',
    },
    {
      question: '한국 이외의 세율도 적용할 수 있나요?',
      answer: '네, 표준 10% 세율 외에 사용자가 직접 세율(%)을 세밀하게 입력하여 계산할 수 있도록 커스텀 기능을 지원합니다.',
    },
  ],
  examples: [
    {
      title: '11,000원 물품의 부가세 포함 역산',
      scenario: '소비자가격이 11,000원인 경우 공급가액과 세액을 구하고 싶을 때',
      result: '공급가액은 10,000원이며 부가세는 1,000원으로 자동 계산됩니다.',
    },
  ],
};
