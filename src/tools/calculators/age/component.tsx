import React, { useState, useEffect } from 'react';
import { ResultCard } from '../../../components/ResultCard';
import { ResetButton } from '../../../components/ResetButton';
import { calculateAge, AgeResult } from './logic';
import { Cake, Sparkles } from 'lucide-react';

export const AgeCalculator: React.FC = () => {
  const todayStr = '2026-07-13'; // 시스템 타임 기준일 설정 (2026-07-13)
  const [birthDate, setBirthDate] = useState('1995-10-10'); // 기본값 예제생일
  const [baseDate, setBaseDate] = useState(todayStr);
  const [result, setResult] = useState<AgeResult | null>(null);

  useEffect(() => {
    if (!birthDate || !baseDate) {
      setResult(null);
      return;
    }
    setResult(calculateAge(birthDate, baseDate));
  }, [birthDate, baseDate]);

  const handleReset = () => {
    setBirthDate('1995-10-10');
    setBaseDate(todayStr);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="age-birth" className="text-xs font-bold uppercase tracking-widest text-[#2F6B4F]/80">생년월일</label>
          <input
            id="age-birth"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="px-4 py-3 bg-[#FBF8F0] border border-[#E2D8C2] rounded-xl outline-none text-[#2C2A24] focus:border-[#2F6B4F] focus:ring-2 focus:ring-[#2F6B4F]/10 font-serif transition-all duration-200"
          />
        </div>
        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="age-base" className="text-xs font-bold uppercase tracking-widest text-[#2F6B4F]/80">나이 측정 기준일</label>
          <input
            id="age-base"
            type="date"
            value={baseDate}
            onChange={(e) => setBaseDate(e.target.value)}
            className="px-4 py-3 bg-[#FBF8F0] border border-[#E2D8C2] rounded-xl outline-none text-[#2C2A24] focus:border-[#2F6B4F] focus:ring-2 focus:ring-[#2F6B4F]/10 font-serif transition-all duration-200"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <ResetButton onReset={handleReset} />
      </div>

      {result ? (
        <div className="flex flex-col gap-6">
          <ResultCard
            title="나이 및 신상 점성술 분석 결과"
            mainValue={`만 ${result.internationalAge}`}
            mainSuffix="세"
            items={[
              {
                label: '생년월일',
                value: result.birthDateStr,
              },
              {
                label: '연 나이 (올해 생일 기준)',
                value: `${result.calendarAge}세`,
              },
              {
                label: '전통 12간지 띠',
                value: result.zodiacSign,
              },
              {
                label: '서양 12성좌 별자리',
                value: result.starSign,
                highlight: true,
              },
            ]}
          />

          {/* 생일 당일 축하 피드백 - 우아한 네이처 세이지 그린 에디션 */}
          {result.isBirthdayToday && (
            <div className="p-6 rounded-2xl bg-[#ECE4D2] border border-[#2F6B4F] flex items-center gap-4 text-[#2F6B4F] animate-pulse">
              <div className="p-3 bg-[#ECE4D2] rounded-xl">
                <Cake className="w-6 h-6 text-[#2F6B4F]" />
              </div>
              <div>
                <h5 className="font-bold text-sm flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-[#2F6B4F]" />
                  <span>오늘 생일을 진심으로 축하합니다!</span>
                </h5>
                <p className="text-xs text-[#2F6B4F]/80 mt-1">
                  가장 눈부시고 아름다운 오늘 하루를 OptiCalc가 따뜻하게 축복해 드립니다.
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-[#ECE4D2] border border-dashed border-[#E2D8C2] text-center text-[#2F6B4F]/70">
          <p className="text-sm font-semibold">생년월일을 올바르게 지정하시면 법적 지위 나이와 띠/별자리가 즉각 매핑됩니다.</p>
        </div>
      )}
    </div>
  );
};
export default AgeCalculator;
