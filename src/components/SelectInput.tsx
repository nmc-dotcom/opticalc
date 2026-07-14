import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: SelectOption[];
}

export const SelectInput: React.FC<SelectInputProps> = ({
  id,
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={id} className="text-xs font-bold uppercase tracking-widest text-[#2F6B4F]/80">
        {label}
      </label>
      <div className="relative flex items-center rounded-xl bg-[#FBF8F0] border border-[#E2D8C2] shadow-sm focus-within:border-[#2F6B4F] focus-within:ring-2 focus-within:ring-[#2F6B4F]/10 transition-all duration-200">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 bg-transparent text-base text-[#2C2A24] outline-none appearance-none pr-10 font-sans cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 pointer-events-none text-[#2F6B4F]/70">
          <svg
            className="w-4 h-4 fill-none stroke-current stroke-2"
            viewBox="0 0 24 24"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
};
