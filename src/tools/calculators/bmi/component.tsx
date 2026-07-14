import React, { useState, useEffect } from 'react';
import { NumberInput } from '../../../components/NumberInput';
import { ResultCard } from '../../../components/ResultCard';
import { ResetButton } from '../../../components/ResetButton';
import { calculateBmi, BmiResult } from './logic';

export const BmiCalculator: React.FC = () => {
  const [height, setHeight] = useState<number | ''>(175); // 175cm 기본값
  const [weight, setWeight] = useState<number | ''>(68); // 68kg 기본값
  const [result, setResult] = useState<BmiResult | null>(null);

  useEffect(() => {
    if (height === '' || weight === '' || height <= 0 || weight <= 0) {
      setResult(null);
      return;
    }
    setResult(calculateBmi(Number(height), Number(weight)));
  }, [height, weight]);

  const handleReset = () => {
    setHeight(175);
    setWeight(68);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NumberInput
          id="bmi-height"
          label="신장 (키)"
          value={height}
          onChange={setHeight}
          suffix="cm"
          min={50}
          max={250}
        />
        <NumberInput
          id="bmi-weight"
          label="체중 (몸무게)"
          value={weight}
          onChange={setWeight}
          suffix="kg"
          min={10}
          max={300}
        />
      </div>

      <div className="flex justify-end">
        <ResetButton onReset={handleReset} />
      </div>

      {result ? (
        <div className="flex flex-col gap-6">
          <ResultCard
            title="체질량지수 (BMI) 진단 결과"
            mainValue={result.bmi}
            mainSuffix="kg/㎡"
            items={[
              {
                label: '비만도 분류',
                value: result.status,
              },
              {
                label: '권장 건강 체중 범위',
                value: `${result.minHealthyWeight} ~ ${result.maxHealthyWeight}`,
                suffix: 'kg',
              },
            ]}
          />

          {/* 게이지 바 비주얼 인디케이터 */}
          <div className="p-6 bg-[#ECE4D2] border border-[#E2D8C2] rounded-2xl">
            <h4 className="text-xs font-bold text-[#6F695B] uppercase tracking-wider mb-4">비만 판단 게이지</h4>
            
            <div className="flex justify-between text-[10px] text-[#6F695B] font-semibold mb-2">
              <span>저체중 (18.5)</span>
              <span>정상 (23)</span>
              <span>과체중 (25)</span>
              <span>비만</span>
            </div>

            <div className="relative h-4 bg-[#E2D8C2] rounded-full overflow-hidden flex">
              <div className="h-full bg-blue-300 w-[25%]" title="저체중 (18.5 미만)"></div>
              <div className="h-full bg-green-300 w-[25%]" title="정상 (18.5 ~ 23)"></div>
              <div className="h-full bg-yellow-300 w-[15%]" title="과체중 (23 ~ 25)"></div>
              <div className="h-full bg-orange-300 w-[15%]" title="경도비만 (25 ~ 30)"></div>
              <div className="h-full bg-red-300 w-[20%]" title="고도비만 (30 이상)"></div>
              
              {/* BMI 포인터 화살표 */}
              {(() => {
                // BMI에 기반한 마커 위치 계산 (수정 비율)
                let pct = 0;
                if (result.bmi < 18.5) {
                  pct = (result.bmi / 18.5) * 25;
                } else if (result.bmi >= 18.5 && result.bmi < 23) {
                  pct = 25 + ((result.bmi - 18.5) / 4.5) * 25;
                } else if (result.bmi >= 23 && result.bmi < 25) {
                  pct = 50 + ((result.bmi - 23) / 2) * 15;
                } else if (result.bmi >= 25 && result.bmi < 30) {
                  pct = 65 + ((result.bmi - 25) / 5) * 15;
                } else {
                  pct = 80 + Math.min(20, ((result.bmi - 30) / 10) * 20);
                }

                return (
                  <div
                    style={{ left: `${Math.min(98, Math.max(2, pct))}%` }}
                    className="absolute top-0 bottom-0 w-1 bg-[#2C2A24] shadow-lg transition-all duration-500"
                  >
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#2C2A24] rotate-45"></div>
                  </div>
                );
              })()}
            </div>

            <div className="mt-4 flex items-center gap-2 p-3 rounded-xl border border-inherit bg-[#FBF8F0] text-xs font-semibold text-[#6F695B]">
              <span className={`px-2 py-1 rounded-lg text-[10px] font-bold border ${result.colorClass.split(' ')[0]} ${result.colorClass.split(' ')[1]} ${result.colorClass.split(' ')[2]}`}>
                {result.status}
              </span>
              <span>현재 고객님의 체격은 신장 대비 아주 건강한 수준에 도달해 있습니다.</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-[#ECE4D2] border border-dashed border-[#E2D8C2] text-center text-[#6F695B]">
          <p className="text-sm font-medium">신장과 체중을 정확히 입력해 주시면 건강 등급 게이지를 실시간 측정해 드립니다.</p>
        </div>
      )}
    </div>
  );
};
export default BmiCalculator;
