import { ToolConfig } from '../../types';

export const areaConfig: ToolConfig = {
  id: 'calc-area',
  title: '평수 계산기',
  description: '제곱미터(㎡)와 전통 평(坪) 단위 간의 상호 환산을 터치 한 번으로 즉시 수행합니다.',
  category: 'calculator',
  subCategory: '생활',
  icon: 'Layout',
  faq: [
    {
      question: '1평은 정확히 몇 제곱미터인가요?',
      answer: '1평은 약 3.305785제곱미터(㎡)에 해당하며, 역으로 1제곱미터(㎡)는 약 0.3025평입니다.',
    },
    {
      question: '아파트 공급면적과 전용면적 계산에도 활용 가능한가요?',
      answer: '네, 흔히 말하는 전용 59㎡(약 18평), 전용 84㎡(약 25.7평) 등 부동산 아파트 크기를 직관적으로 변환할 때 유용하게 쓰입니다.',
    },
  ],
  examples: [
    {
      title: '국민평수 84㎡ 변환',
      scenario: '아파트 분양 전용면적 84제곱미터를 평수로 가늠할 때',
      result: '약 25.4평으로 빠르고 직관적으로 산출됩니다.',
    },
  ],
};
