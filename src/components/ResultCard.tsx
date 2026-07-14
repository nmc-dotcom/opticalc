import React from 'react';
import { CopyButton } from './CopyButton';

interface ResultItem {
  label: string;
  value: string | number;
  suffix?: string;
  highlight?: boolean;
}

interface ResultCardProps {
  id?: string;
  title: string;
  mainValue: string | number;
  mainSuffix?: string;
  items?: ResultItem[];
}

export const ResultCard: React.FC<ResultCardProps> = ({
  id,
  title,
  mainValue,
  mainSuffix = '',
  items = [],
}) => {
  return (
    <div
      id={id}
      className="p-8 rounded-3xl bg-[#ECE4D2] border border-[#E2D8C2] flex flex-col gap-6 transition-all duration-300"
    >
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold tracking-widest text-[#2F6B4F]/70 uppercase">
          {title}
        </span>
        <CopyButton value={mainValue} label="결과 복사" />
      </div>

      <div className="flex items-baseline gap-1.5">
        <span className="text-4xl font-extrabold tracking-tight text-[#2C2A24] font-serif">
          {typeof mainValue === 'number' ? mainValue.toLocaleString() : mainValue}
        </span>
        {mainSuffix && (
          <span className="text-lg font-bold text-[#2F6B4F]/80">
            {mainSuffix}
          </span>
        )}
      </div>

      {items.length > 0 && (
        <div className="flex flex-col gap-3.5 pt-5 border-t border-[#E2D8C2]">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center text-sm"
            >
              <span className="text-[#2C2A24]/60 font-medium">{item.label}</span>
              <div className="flex items-center gap-1.5">
                <span
                  className={`font-serif ${
                    item.highlight
                      ? 'text-lg font-bold text-[#2F6B4F]'
                      : 'text-[#2C2A24] font-semibold'
                  }`}
                >
                  {typeof item.value === 'number'
                    ? item.value.toLocaleString()
                    : item.value}
                </span>
                {item.suffix && (
                  <span className="text-xs text-[#2F6B4F]/70 font-bold uppercase tracking-wider">
                    {item.suffix}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
