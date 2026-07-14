import React from 'react';

export interface ToolConfig {
  id: string;
  title: string;
  description: string;
  category: 'calculator' | 'converter' | 'currency';
  subCategory: string; // 예: '금융', '생활', '날짜', '단위변환', '환율'
  icon: string; // lucide 아이콘 이름
  faq?: { question: string; answer: string }[];
  examples?: { title: string; scenario: string; result: string }[];
}

export interface ToolRegistryItem {
  config: ToolConfig;
  component: React.ComponentType;
}
