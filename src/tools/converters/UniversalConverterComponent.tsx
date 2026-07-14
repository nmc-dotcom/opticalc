import React, { useState, useEffect } from 'react';
import { NumberInput } from '../../components/NumberInput';
import { SelectInput } from '../../components/SelectInput';
import { ResultCard } from '../../components/ResultCard';
import { ResetButton } from '../../components/ResetButton';
import { convertUnits, UnitConverterConfig } from './converterEngine';
import { Scale } from 'lucide-react';

interface UniversalConverterComponentProps {
  config: UnitConverterConfig;
}

export const UniversalConverterComponent: React.FC<UniversalConverterComponentProps> = ({
  config,
}) => {
  const [inputValue, setInputValue] = useState<number | ''>(1);
  const [fromUnit, setFromUnit] = useState(config.units[0]?.value || '');
  const [toUnit, setToUnit] = useState(config.units[1]?.value || config.units[0]?.value || '');
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    if (inputValue === '') {
      setResult(null);
      return;
    }
    const converted = convertUnits(Number(inputValue), fromUnit, toUnit, config);
    // 소수점 아래 불필요한 자릿수 절삭 및 정리
    setResult(Math.round(converted * 100000000) / 100000000);
  }, [inputValue, fromUnit, toUnit, config]);

  const handleReset = () => {
    setInputValue(1);
    setFromUnit(config.units[0]?.value || '');
    setToUnit(config.units[1]?.value || config.units[0]?.value || '');
  };

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const selectOptions = config.units.map((u) => ({
    value: u.value,
    label: `${u.label} (${u.value})`,
  }));

  const fromLabel = config.units.find((u) => u.value === fromUnit)?.label || '';
  const toLabel = config.units.find((u) => u.value === toUnit)?.label || '';

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-end gap-4">
        <div className="flex flex-col gap-2">
          <NumberInput
            id={`${config.id}-input`}
            label="변환할 값"
            value={inputValue}
            onChange={setInputValue}
            suffix={fromUnit}
          />
          <SelectInput
            id={`${config.id}-from`}
            label="시작 단위"
            value={fromUnit}
            onChange={setFromUnit}
            options={selectOptions}
          />
        </div>

        <button
          onClick={handleSwap}
          className="p-3 rounded-xl border border-[#E2D8C2] bg-[#ECE4D2] hover:bg-[#E2D8C2] text-[#2F6B4F] hover:text-[#2C2A24] flex items-center justify-center cursor-pointer transition-all duration-200 h-[50px] md:mb-[14px]"
          title="단위 서로 바꾸기"
        >
          <svg className="w-5 h-5 md:rotate-90 rotate-0 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
            <path d="M17 3L21 7L17 11" />
            <path d="M3 17L7 21L11 17" />
            <path d="M21 7H9" />
            <path d="M3 17H15" />
          </svg>
        </button>

        <div className="flex flex-col gap-2">
          <div className="md:h-[50px] flex items-end">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2F6B4F]/70 pb-2 hidden md:block">변환 결과 단위 선택</span>
          </div>
          <SelectInput
            id={`${config.id}-to`}
            label="목표 단위"
            value={toUnit}
            onChange={setToUnit}
            options={selectOptions}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <ResetButton onReset={handleReset} />
      </div>

      {result !== null && inputValue !== '' ? (
        <div className="flex flex-col gap-6">
          <ResultCard
            title="정밀 단위 환산 결과"
            mainValue={result}
            mainSuffix={toUnit}
            items={[
              {
                label: '시작 원본 크기',
                value: `${inputValue} ${fromUnit} (${fromLabel})`,
              },
              {
                label: '변환 대상 크기',
                value: `${result} ${toUnit} (${toLabel})`,
                highlight: true,
              },
            ]}
          />

          {/* 한눈에 보는 전체 단위 환산 대시보드 */}
          <div className="p-6 bg-[#ECE4D2] border border-[#E2D8C2] rounded-2xl">
            <h4 className="text-xs font-bold text-[#2F6B4F]/80 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#2F6B4F]" />
              <span>전체 단위 한눈에 보기 환산표</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {config.units.map((unit) => {
                const converted = convertUnits(Number(inputValue), fromUnit, unit.value, config);
                const displayVal = Math.round(converted * 1000000) / 1000000;
                const isSelected = unit.value === toUnit;

                return (
                  <div
                    key={unit.value}
                    className={`p-3 rounded-xl border flex flex-col gap-1 transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#ECE4D2] border-[#2F6B4F] text-[#2F6B4F]'
                        : 'bg-[#FBF8F0] border-[#E2D8C2] text-[#2C2A24] hover:border-[#2F6B4F]/50'
                    }`}
                  >
                    <span className="text-[10px] font-bold opacity-60 uppercase">{unit.label} ({unit.value})</span>
                    <span className="font-mono font-bold text-sm truncate" title={String(displayVal)}>
                      {displayVal.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-[#ECE4D2] border border-dashed border-[#E2D8C2] text-center text-[#2F6B4F]/70">
          <p className="text-sm font-semibold">유효한 수치를 작성해 주시면 실시간 정밀 변환과 더불어 전체 환산 리스트가 출력됩니다.</p>
        </div>
      )}
    </div>
  );
};
export default UniversalConverterComponent;
