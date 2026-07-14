import { ToolConfig } from '../../types';

export const bmiConfig: ToolConfig = {
  id: 'calc-bmi',
  title: 'BMI 계산기 (체질량지수)',
  description: '신장과 체중을 입력하여 신체 비만 지수를 측정하고 건강 등급을 실시간 분류합니다.',
  category: 'calculator',
  subCategory: '생활',
  icon: 'Activity',
  faq: [
    {
      question: 'BMI 지수의 비만 판단 기준은 어떻게 되나요?',
      answer: '세계보건기구(WHO) 및 한국 아시아-태평양 비만기준에 따라 18.5 미만은 저체중, 18.5~22.9는 정상, 23~24.9는 과체중, 25 이상은 비만으로 구분됩니다.',
    },
  ],
  examples: [
    {
      title: '키 175cm, 몸무게 70kg의 경우',
      scenario: '신장 175cm, 체중 70kg인 남성 또는 여성의 BMI 상태',
      result: 'BMI 지수는 약 22.86으로 완벽한 [정상 체중] 범위에 위치합니다.',
    },
  ],
};
