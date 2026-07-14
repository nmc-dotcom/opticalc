import React, { useState, useEffect } from 'react';
import { NumberInput } from '../../../components/NumberInput';
import { ResultCard } from '../../../components/ResultCard';
import { ResetButton } from '../../../components/ResetButton';
import { m2ToPy, pyToM2 } from './logic';

export const AreaCalculator: React.FC = () => {
  const [m2Value, setM2Value] = useState<number | ''>(84);
  const [pyValue, setPyValue] = useState<number | ''>(25.41);

  // 양방향 자동 변경을 보정하기 위해 마지막으로 수정한 필드 추적
  const [lastUpdated, setLastUpdated] = useState<'m2' | 'py'>('m2');

  useEffect(() => {
    if (lastUpdated === 'm2') {
      if (m2Value === '') {
        setPyValue('');
        return;
      }
      const res = m2ToPy(Number(m2Value));
      setPyValue(res.valuePy);
    }
  }, [m2Value, lastUpdated]);

  useEffect(() => {
    if (lastUpdated === 'py') {
      if (pyValue === '') {
        setM2Value('');
        return;
      }
      const res = pyToM2(Number(pyValue));
      setM2Value(res.valueM2);
    }
  }, [pyValue, lastUpdated]);

  const handleM2Change = (val: number | '') => {
    setLastUpdated('m2');
    setM2Value(val);
  };

  const handlePyChange = (val: number | '') => {
    setLastUpdated('py');
    setPyValue(val);
  };

  const handleReset = () => {
    setLastUpdated('m2');
    setM2Value(84);
    setPyValue(25.41);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* 제곱미터 입력단 */}
        <div className="flex flex-col gap-2">
          <NumberInput
            id="area-m2"
            label="제곱미터 면적"
            value={m2Value}
            onChange={handleM2Change}
            suffix="㎡"
            min={0}
          />
          <div className="flex gap-1.5 flex-wrap">
            <span className="text-[10px] text-[#6F695B] font-semibold self-center mr-1">주요 분양 면적:</span>
            {[59, 84, 114, 135].map((preset) => (
              <button
                key={preset}
                onClick={() => {
                  setLastUpdated('m2');
                  setM2Value(preset);
                }}
                className="px-2 py-0.5 text-[10px] font-semibold text-[#6F695B] border border-[#E2D8C2] bg-[#ECE4D2] rounded-lg hover:bg-[#ECE4D2] hover:text-[#2C2A24] cursor-pointer"
              >
                {preset}㎡
              </button>
            ))}
          </div>
        </div>

        {/* 평수 입력단 */}
        <div className="flex flex-col gap-2">
          <NumberInput
            id="area-py"
            label="평수 면적"
            value={pyValue}
            onChange={handlePyChange}
            suffix="평"
            min={0}
          />
          <div className="flex gap-1.5 flex-wrap">
            <span className="text-[10px] text-[#6F695B] font-semibold self-center mr-1">주요 아파트 평형:</span>
            {[18, 25, 34, 45].map((preset) => (
              <button
                key={preset}
                onClick={() => {
                  setLastUpdated('py');
                  setPyValue(preset);
                }}
                className="px-2 py-0.5 text-[10px] font-semibold text-[#6F695B] border border-[#E2D8C2] bg-[#ECE4D2] rounded-lg hover:bg-[#ECE4D2] hover:text-[#2C2A24] cursor-pointer"
              >
                {preset}평
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <ResetButton onReset={handleReset} />
      </div>

      {m2Value !== '' && pyValue !== '' ? (
        <ResultCard
          title="면적 평수 상호 변환 결과"
          mainValue={`${Number(m2Value).toLocaleString()} ㎡`}
          mainSuffix={`=  ${Number(pyValue).toLocaleString()} 평`}
          items={[
            {
              label: '정밀 계산 비율 (㎡ → 평)',
              value: `${m2Value} × 0.3025 = ${(Number(m2Value) * 0.3025).toFixed(4)}`,
              suffix: '평',
            },
            {
              label: '정밀 계산 비율 (평 → ㎡)',
              value: `${pyValue} × 3.3058 = ${(Number(pyValue) * 3.305785).toFixed(4)}`,
              suffix: '㎡',
            },
          ]}
        />
      ) : (
        <div className="p-6 rounded-2xl bg-[#ECE4D2] border border-dashed border-[#E2D8C2] text-center text-[#6F695B]">
          <p className="text-sm font-medium">한쪽의 값을 입력해 주시면 다른 한쪽이 양방향 자동 계산되어 표시됩니다.</p>
        </div>
      )}
    </div>
  );
};
export default AreaCalculator;
