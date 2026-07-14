import React, { useState, useEffect } from 'react';
import { ResultCard } from '../../../components/ResultCard';
import { ResetButton } from '../../../components/ResetButton';
import { NumberInput } from '../../../components/NumberInput';
import { calculateDday, calculateFutureDate, DdayResult } from './logic';

export const DdayCalculator: React.FC = () => {
  const todayStr = '2026-07-13'; // 제공된 시스템 타임 기반 설정 (2026-07-13)
  const [startDate, setStartDate] = useState(todayStr);
  const [endDate, setEndDate] = useState('2026-12-25'); // 다가오는 크리스마스 기본 예제
  const [includeStartDay, setIncludeStartDay] = useState(false);
  const [result, setResult] = useState<DdayResult | null>(null);

  // 미래 날짜 계산 파트
  const [addDays, setAddDays] = useState<number | ''>(100);
  const [futureDateStr, setFutureDateStr] = useState('');

  useEffect(() => {
    if (!startDate || !endDate) {
      setResult(null);
      return;
    }
    setResult(calculateDday(startDate, endDate, includeStartDay));
  }, [startDate, endDate, includeStartDay]);

  useEffect(() => {
    if (!startDate || addDays === '' || addDays <= 0) {
      setFutureDateStr('');
      return;
    }
    const res = calculateFutureDate(startDate, Number(addDays));
    setFutureDateStr(res.targetDateStr);
  }, [startDate, addDays]);

  const handleReset = () => {
    setStartDate(todayStr);
    setEndDate('2026-12-25');
    setIncludeStartDay(false);
    setAddDays(100);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 1. D-Day 디데이 기간 계산 */}
      <div className="p-6 bg-[#FBF8F0] border border-[#E2D8C2] rounded-2xl flex flex-col gap-4 shadow-sm">
        <h4 className="text-sm font-semibold text-[#2C2A24] border-b border-[#E2D8C2] pb-2">D-Day 계산 (두 날짜 비교)</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor="dday-start" className="text-xs font-bold uppercase tracking-widest text-[#2F6B4F]/80">기준 날짜</label>
            <input
              id="dday-start"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-4 py-3 bg-[#FBF8F0] border border-[#E2D8C2] rounded-xl outline-none text-[#2C2A24] focus:border-[#2F6B4F] focus:ring-2 focus:ring-[#2F6B4F]/10 font-serif transition-all duration-200"
            />
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor="dday-end" className="text-xs font-bold uppercase tracking-widest text-[#2F6B4F]/80">목표 날짜</label>
            <input
              id="dday-end"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-4 py-3 bg-[#FBF8F0] border border-[#E2D8C2] rounded-xl outline-none text-[#2C2A24] focus:border-[#2F6B4F] focus:ring-2 focus:ring-[#2F6B4F]/10 font-serif transition-all duration-200"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <input
            id="dday-include-today"
            type="checkbox"
            checked={includeStartDay}
            onChange={(e) => setIncludeStartDay(e.target.checked)}
            className="w-4 h-4 rounded border-[#E2D8C2] text-[#2F6B4F] focus:ring-[#2F6B4F]/20 cursor-pointer accent-[#2F6B4F]"
          />
          <label htmlFor="dday-include-today" className="text-xs font-bold text-[#2C2A24]/70 cursor-pointer select-none">
            시작일을 1일로 포함 (연애 기념일, 근무일수 계산 시 체크)
          </label>
        </div>
      </div>

      {/* 2. 기념일 기준 특정 일수 이후 계산 */}
      <div className="p-6 bg-[#FBF8F0] border border-[#E2D8C2] rounded-2xl flex flex-col gap-4 shadow-sm">
        <h4 className="text-sm font-semibold text-[#2C2A24] border-b border-[#E2D8C2] pb-2">기념일 계산 (기준일로부터 N일째 되는 날)</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <NumberInput
            id="dday-add-days"
            label="경과 일수 입력"
            value={addDays}
            onChange={setAddDays}
            suffix="일째"
            min={1}
            max={100000}
          />
          <div className="flex gap-2 flex-wrap pb-1">
            {[100, 200, 300, 365, 1000].map((preset) => (
              <button
                key={preset}
                onClick={() => setAddDays(preset)}
                className="px-3 py-1.5 text-xs font-bold text-[#2F6B4F] border border-[#E2D8C2] bg-[#ECE4D2] rounded-xl hover:bg-[#E2D8C2] hover:text-[#2C2A24] cursor-pointer transition-all duration-200"
              >
                {preset}일
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <ResetButton onReset={handleReset} />
      </div>

      {/* 종합 계산 결과 렌더링 */}
      {result && (
        <div className="flex flex-col gap-6">
          <ResultCard
            title="D-Day 연산 결과"
            mainValue={result.displayText}
            mainSuffix=""
            items={[
              {
                label: '시작일',
                value: startDate,
              },
              {
                label: '목표일',
                value: endDate,
              },
              {
                label: '순수 두 날짜 간격',
                value: `${Math.abs(result.rawDiffDays)}일`,
                suffix: result.rawDiffDays >= 0 ? '남음' : '지남',
                highlight: true,
              },
            ]}
          />

          {futureDateStr && addDays !== '' && (
            <ResultCard
              title={`${addDays}일째 되는 날 검색 결과`}
              mainValue={futureDateStr}
              mainSuffix=""
              items={[
                {
                  label: '적용 기준일',
                  value: startDate,
                },
                {
                  label: '지정 경과일',
                  value: `${addDays} 일째 (기준일 1일 포함)`,
                },
              ]}
            />
          )}
        </div>
      )}
    </div>
  );
};
export default DdayCalculator;
