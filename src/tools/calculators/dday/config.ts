import { ToolConfig } from '../../types';

export const ddayConfig: ToolConfig = {
  id: 'calc-dday',
  title: 'D-Day 계산기 (날짜 계산기)',
  description: '특정 기념일이나 목표일까지 남은 일수 및 지나온 소중한 일수를 정확하게 환산합니다.',
  category: 'calculator',
  subCategory: '날짜',
  icon: 'CalendarDays',
  faq: [
    {
      question: '기준일(오늘)을 1일로 포함하나요?',
      answer: '만기일 계산기나 기념일 계산은 옵션에 따라 오늘을 1일로 포함(만난 지 100일 계산 등)하거나, 제외(D-Day 계산, 시험 디데이 등)하는 차이가 있습니다. 본 도구는 직관적인 D-Day 계산과 더불어 오늘 포함 여부를 선택할 수 있도록 옵션을 내장했습니다.',
    },
  ],
  examples: [
    {
      title: '시험일 혹은 전역일 남은 날짜',
      scenario: '오늘이 2026년 7월 13일이고, 목표일이 2026년 8월 15일 광복절일 때',
      result: 'D-33일로 안전하게 도출됩니다.',
    },
  ],
};
