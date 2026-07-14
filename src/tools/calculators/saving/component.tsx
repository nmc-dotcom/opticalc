import React, { useState, useEffect } from 'react';
import { NumberInput } from '../../../components/NumberInput';
import { ResultCard } from '../../../components/ResultCard';
import { ResetButton } from '../../../components/ResetButton';
import { calculateSaving, TaxType, SavingResult } from './logic';

export const SavingCalculator: React.FC = () => {
  const [monthlyDeposit, setMonthlyDeposit] = useState<number | ''>(1000000); // 100만원
  const [rateAnnual, setRateAnnual] = useState<number | ''>(4); // 연 4%
  const [termMonths, setTermMonths] = useState<number | ''>(12); // 12개월
  const [taxType, setTaxType] = useState<TaxType>('normal');
  const [result, setResult] = useState<SavingResult | null>(null);

  useEffect(() => {
    if (monthlyDeposit === '' || rateAnnual === '' || termMonths === '' || termMonths <= 0) {
      setResult(null);
      return;
    }
    setResult(
      calculateSaving(Number(monthlyDeposit), Number(rateAnnual), Number(termMonths), taxType)
    );
  }, [monthlyDeposit, rateAnnual, termMonths, taxType]);

  const handleReset = () => {
    setMonthlyDeposit(1000000);
    setRateAnnual(4);
    setTermMonths(12);
    setTaxType('normal');
  };

  const setTermPreset = (months: number) => {
    setTermMonths(months);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex bg-[#ECE4D2] p-1 rounded-xl border border-[#E2D8C2] self-start flex-wrap gap-1">
        <button
          onClick={() => setTaxType('normal')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
            taxType === 'normal'
              ? 'bg-[#2F6B4F] text-white shadow-sm'
              : 'text-[#6F695B] hover:text-[#2C2A24]'
          }`}
        >
          일반과세 (15.4%)
        </button>
        <button
          onClick={() => setTaxType('preferential')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
            taxType === 'preferential'
              ? 'bg-[#2F6B4F] text-white shadow-sm'
              : 'text-[#6F695B] hover:text-[#2C2A24]'
          }`}
        >
          세금우대 (9.5%)
        </button>
        <button
          onClick={() => setTaxType('free')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
            taxType === 'free'
              ? 'bg-[#2F6B4F] text-white shadow-sm'
              : 'text-[#6F695B] hover:text-[#2C2A24]'
          }`}
        >
          비과세 (0%)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NumberInput
          id="saving-monthly"
          label="월 납입액"
          value={monthlyDeposit}
          onChange={setMonthlyDeposit}
          suffix="원"
          min={0}
        />
        <NumberInput
          id="saving-rate"
          label="연 이자율"
          value={rateAnnual}
          onChange={setRateAnnual}
          suffix="%"
          min={0}
          max={100}
          step={0.1}
        />
        <div className="flex flex-col gap-1.5 w-full">
          <NumberInput
            id="saving-term"
            label="적금 기간"
            value={termMonths}
            onChange={setTermMonths}
            suffix="개월"
            min={1}
            max={360}
          />
          <div className="flex gap-1.5 mt-1">
            <button
              onClick={() => setTermPreset(6)}
              className="px-2 py-1 text-[10px] font-semibold text-[#6F695B] border border-[#E2D8C2] bg-[#ECE4D2] rounded-lg hover:bg-[#ECE4D2] hover:text-[#2C2A24] cursor-pointer"
            >
              6개월
            </button>
            <button
              onClick={() => setTermPreset(12)}
              className="px-2 py-1 text-[10px] font-semibold text-[#6F695B] border border-[#E2D8C2] bg-[#ECE4D2] rounded-lg hover:bg-[#ECE4D2] hover:text-[#2C2A24] cursor-pointer"
            >
              1년
            </button>
            <button
              onClick={() => setTermPreset(24)}
              className="px-2 py-1 text-[10px] font-semibold text-[#6F695B] border border-[#E2D8C2] bg-[#ECE4D2] rounded-lg hover:bg-[#ECE4D2] hover:text-[#2C2A24] cursor-pointer"
            >
              2년
            </button>
            <button
              onClick={() => setTermPreset(36)}
              className="px-2 py-1 text-[10px] font-semibold text-[#6F695B] border border-[#E2D8C2] bg-[#ECE4D2] rounded-lg hover:bg-[#ECE4D2] hover:text-[#2C2A24] cursor-pointer"
            >
              3년
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <ResetButton onReset={handleReset} />
      </div>

      {result ? (
        <ResultCard
          title="정기적금 만기 예상 수령액"
          mainValue={result.netTotal}
          mainSuffix="원"
          items={[
            {
              label: '총 원금 합계',
              value: result.totalPrincipal,
              suffix: '원',
            },
            {
              label: '세전 이자',
              value: result.grossInterest,
              suffix: '원',
            },
            {
              label: '이자 소득세',
              value: result.taxAmount,
              suffix: '원',
              highlight: result.taxAmount > 0,
            },
            {
              label: '세후 수령 이자',
              value: result.netInterest,
              suffix: '원',
              highlight: true,
            },
          ]}
        />
      ) : (
        <div className="p-6 rounded-2xl bg-[#ECE4D2] border border-dashed border-[#E2D8C2] text-center text-[#6F695B]">
          <p className="text-sm font-medium">월 적립액, 이자율, 적립 기간을 입력하시면 만기 수령금 총액이 산출됩니다.</p>
        </div>
      )}
    </div>
  );
};
export default SavingCalculator;
