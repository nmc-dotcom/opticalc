import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  value: string | number;
  label?: string;
  id?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ value, label = '복사', id }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(String(value));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
    }
  };

  return (
    <button
      id={id}
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 border cursor-pointer ${
        copied
          ? 'bg-[#ECE4D2] text-[#2F6B4F] border-[#E2D8C2]'
          : 'bg-[#ECE4D2] text-[#2F6B4F] border-[#E2D8C2] hover:bg-[#E2D8C2] hover:text-[#2C2A24]'
      }`}
      aria-label={`${label} 복사`}
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      <span>{copied ? '복사 완료' : label}</span>
    </button>
  );
};
