import React, { useState, useEffect } from 'react';
import { NumberInput } from '../../../components/NumberInput';
import { ResultCard } from '../../../components/ResultCard';
import { ResetButton } from '../../../components/ResetButton';
import { calculateDiscount, DiscountResult } from './logic';

export const DiscountCalculator: React.FC = () => {
  const [originalPrice, setOriginalPrice] = useState<number | ''>(50000); // 5만원
  const [discountRate, setDiscountRate] = useState<number | ''>(20); // 20%
  const [result, setResult] = useState<DiscountResult | null>(null);

  useEffect(() => {
    if (originalPrice === '' || discountRate === '') {
      setResult(null);
      return;
    }
    setResult(calculateDiscount(Number(originalPrice), Number(discountRate)));
  }, [originalPrice, discountRate]);

  const handleReset = () => {
    setOriginalPrice(50000);
    setDiscountRate(20);
  };

  const setDiscountPreset = (rate: number) => {
    setDiscountRate(rate);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NumberInput
          id="discount-price"
          label="원래 가격 (원가)"
          value={originalPrice}
          onChange={setOriginalPrice}
          suffix="원"
          min={0}
        />
        <div className="flex flex-col gap-1.5 w-full">
          <NumberInput
            id="discount-rate-input"
            label="할인율"
            value={discountRate}
            onChange={setDiscountRate}
            suffix="%"
            min={0}
            max={100}
          />
          <div className="flex gap-1.5 mt-1">
            {[10, 20, 30, 50, 70].map((rate) => (
              <button
                key={rate}
                onClick={() => setDiscountPreset(rate)}
                className="px-2.5 py-1 text-[10px] font-semibold text-[#6F695B] border border-[#E2D8C2] bg-[#ECE4D2] rounded-lg hover:bg-[#ECE4D2] hover:text-[#2C2A24] cursor-pointer"
              >
                {rate}%
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <ResetButton onReset={handleReset} />
      </div>

      {result ? (
        <ResultCard
          title="할인 혜택 결과 분석"
          mainValue={result.finalPrice}
          mainSuffix="원"
          items={[
            {
              label: '정상가 (원가)',
              value: result.originalPrice,
              suffix: '원',
            },
            {
              label: '할인 적용 비율',
              value: `${result.discountRate}%`,
            },
            {
              label: '세이브 금액 (할인 이득)',
              value: result.discountAmount,
              suffix: '원',
              highlight: true,
            },
          ]}
        />
      ) : (
        <div className="p-6 rounded-2xl bg-[#ECE4D2] border border-dashed border-[#E2D8C2] text-center text-[#6F695B]">
          <p className="text-sm font-medium">정상가와 희망 할인율을 올바르게 기입하시면 최종 구매 혜택가가 산출됩니다.</p>
        </div>
      )}
    </div>
  );
};
export default DiscountCalculator;
