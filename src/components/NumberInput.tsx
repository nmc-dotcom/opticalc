import React from 'react';

interface NumberInputProps {
  id: string;
  label: string;
  value: number | '';
  onChange: (val: number | '') => void;
  placeholder?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder = '0',
  suffix,
  min,
  max,
  step = 1,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valStr = e.target.value;
    if (valStr === '') {
      onChange('');
      return;
    }
    const num = parseFloat(valStr);
    if (!isNaN(num)) {
      if (min !== undefined && num < min) {
        onChange(min);
      } else if (max !== undefined && num > max) {
        onChange(max);
      } else {
        onChange(num);
      }
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={id} className="text-xs font-bold uppercase tracking-widest text-[#2F6B4F]/80">
        {label}
      </label>
      <div className="relative flex items-center rounded-xl bg-[#FBF8F0] border border-[#E2D8C2] shadow-sm focus-within:border-[#2F6B4F] focus-within:ring-2 focus-within:ring-[#2F6B4F]/10 transition-all duration-200">
        <input
          id={id}
          type="number"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className="w-full px-4 py-3 bg-transparent text-base text-[#2C2A24] placeholder-[#6F695B]/60 outline-none font-serif"
        />
        {suffix && (
          <span className="pr-4 text-xs font-bold uppercase tracking-widest text-[#2F6B4F]/70 select-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};
