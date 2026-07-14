import React, { useState, useEffect } from 'react';
import { NumberInput } from '../../../components/NumberInput';
import { ResultCard } from '../../../components/ResultCard';
import { ResetButton } from '../../../components/ResetButton';
import { calculateFromSupply, calculateFromTotal, VatResult } from './logic';

export const VatCalculator: React.FC = () => {
  const [calcMode, setCalcMode] = useState<'supply' | 'total'>('supply');
  const [inputValue, setInputValue] = useState<number | ''>(100000);
  const [vatRate, setVatRate] = useState<number | ''>(10);
  const [result, setResult] = useState<VatResult | null>(null);

  useEffect(() => {
    if (inputValue === '' || vatRate === '') {
      setResult(null);
      return;
    }

    const rate = Number(vatRate);
    if (calcMode === 'supply') {
      setResult(calculateFromSupply(Number(inputValue), rate));
    } else {
      setResult(calculateFromTotal(Number(inputValue), rate));
    }
  }, [calcMode, inputValue, vatRate]);

  const handleReset = () => {
    setCalcMode('supply');
    setInputValue(100000);
    setVatRate(10);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 입력 방식 전환 탭 */}
      <div className="flex bg-[#ECE4D2] p-1 rounded-xl border border-[#E2D8C2] self-start">
        <button
          onClick={() => {
            setCalcMode('supply');
            if (result) setInputValue(result.supplyValue);
          }}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
            calcMode === 'supply'
              ? 'bg-[#2F6B4F] text-white shadow-sm'
              : 'text-[#6F695B] hover:text-[#2C2A24]'
          }`}
        >
          공급가액 기준 (부가세 별도)
        </button>
        <button
          onClick={() => {
            setCalcMode('total');
            if (result) setInputValue(result.totalValue);
          }}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
            calcMode === 'total'
              ? 'bg-[#2F6B4F] text-white shadow-sm'
              : 'text-[#6F695B] hover:text-[#2C2A24]'
          }`}
        >
          합계금액 기준 (부가세 포함)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NumberInput
          id="vat-input"
          label={calcMode === 'supply' ? '공급가액' : '합계금액 (소비자가)'}
          value={inputValue}
          onChange={setInputValue}
          suffix="원"
          min={0}
        />
        <NumberInput
          id="vat-rate"
          label="세율"
          value={vatRate}
          onChange={setVatRate}
          suffix="%"
          min={0}
          max={100}
        />
      </div>

      <div className="flex justify-end">
        <ResetButton onReset={handleReset} />
      </div>

      {result ? (
        <ResultCard
          title="부가가치세 계산 결과"
          mainValue={result.totalValue}
          mainSuffix="원"
          items={[
            {
              label: '공급가액 (원금)',
              value: result.supplyValue,
              suffix: '원',
            },
            {
              label: `부가가치세 (${vatRate}%)`,
              value: result.vatValue,
              suffix: '원',
              highlight: true,
            },
          ]}
        />
      ) : (
        <div className="p-6 rounded-2xl bg-[#ECE4D2] border border-dashed border-[#E2D8C2] text-center text-[#6F695B]">
          <p className="text-sm font-medium">값과 세율을 정확하게 입력하시면 즉시 부가세가 계산됩니다.</p>
        </div>
      )}
    </div>
  );
};
export default VatCalculator;
