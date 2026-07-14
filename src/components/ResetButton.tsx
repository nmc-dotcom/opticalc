import React from 'react';
import { RotateCcw } from 'lucide-react';

interface ResetButtonProps {
  onReset: () => void;
  id?: string;
}

export const ResetButton: React.FC<ResetButtonProps> = ({ onReset, id }) => {
  return (
    <button
      id={id}
      onClick={onReset}
      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl transition-all duration-200 border-none bg-[#E2D8C2] text-[#2C2A24] hover:bg-[#E3CE9E] cursor-pointer"
      aria-label="입력값 초기화"
    >
      <RotateCcw className="w-3.5 h-3.5" />
      <span>초기화</span>
    </button>
  );
};
