import { ToolConfig } from '../../types';

export const ageConfig: ToolConfig = {
  id: 'calc-age',
  title: '만나이 계산기',
  description: '생년월일을 기준으로 법적 표준 만나이, 연나이 및 띠, 별자리를 즉각 확인합니다.',
  category: 'calculator',
  subCategory: '날짜',
  icon: 'UserCheck',
  faq: [
    {
      question: '만나이와 연나이의 구체적인 법적 쓰임새 차이는 무엇인가요?',
      answer: '만나이는 민법 및 표준 일상생활의 기준으로서 생일이 지나야 비로소 한 살씩 추가되며, 연나이는 청소년보호법이나 병역법처럼 생일과 상관없이 현재 연도에서 태어난 연도를 빼 규제 나이를 따질 때 쓰입니다.',
    },
  ],
  examples: [
    {
      title: '1995년 10월 10일생의 오늘 나이',
      scenario: '2026년 7월 13일 기준으로 1995년 10월 10일생의 법적 지위 나이',
      result: '만나이는 30세(생일 미경과), 연나이는 31세로 계산되며 돼지띠 및 천칭자리로 식별됩니다.',
    },
  ],
};
