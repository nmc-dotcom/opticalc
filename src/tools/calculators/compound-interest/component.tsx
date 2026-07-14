import React, { useState, useEffect } from 'react';
import { NumberInput } from '../../../components/NumberInput';
import { ResultCard } from '../../../components/ResultCard';
import { ResetButton } from '../../../components/ResetButton';
import { calculateCompoundInterest, CompoundFrequency, CompoundInterestResult } from './logic';
import { TrendingUp } from 'lucide-react';

export const CompoundInterestCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<number | ''>(10000000); // 1,000만원
  const [rateAnnual, setRateAnnual] = useState<number | ''>(5); // 5%
  const [years, setYears] = useState<number | ''>(10); // 10년
  const [frequency, setFrequency] = useState<CompoundFrequency>('annual');
  const [result, setResult] = useState<CompoundInterestResult | null>(null);

  useEffect(() => {
    if (principal === '' || rateAnnual === '' || years === '' || years <= 0) {
      setResult(null);
      return;
    }
    setResult(
      calculateCompoundInterest(Number(principal), Number(rateAnnual), Number(years), frequency)
    );
  }, [principal, rateAnnual, years, frequency]);

  const handleReset = () => {
    setPrincipal(10000000);
    setRateAnnual(5);
    setYears(10);
    setFrequency('annual');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex bg-[#ECE4D2] p-1 rounded-xl border border-[#E2D8C2] self-start">
        <button
          onClick={() => setFrequency('annual')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
            frequency === 'annual'
              ? 'bg-[#2F6B4F] text-white shadow-sm'
              : 'text-[#6F695B] hover:text-[#2C2A24]'
          }`}
        >
          연복리 (1년 단위)
        </button>
        <button
          onClick={() => setFrequency('monthly')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
            frequency === 'monthly'
              ? 'bg-[#2F6B4F] text-white shadow-sm'
              : 'text-[#6F695B] hover:text-[#2C2A24]'
          }`}
        >
          월복리 (1달 단위)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NumberInput
          id="compound-principal"
          label="초기 거치 원금"
          value={principal}
          onChange={setPrincipal}
          suffix="원"
          min={0}
        />
        <NumberInput
          id="compound-rate"
          label="연 이자율"
          value={rateAnnual}
          onChange={setRateAnnual}
          suffix="%"
          min={0}
          max={100}
          step={0.1}
        />
        <NumberInput
          id="compound-years"
          label="거치 기간"
          value={years}
          onChange={setYears}
          suffix="년"
          min={1}
          max={100}
        />
      </div>

      <div className="flex justify-end">
        <ResetButton onReset={handleReset} />
      </div>

      {result ? (
        <div className="flex flex-col gap-6">
          <ResultCard
            title="복리 자산 가치 시뮬레이션"
            mainValue={result.compoundTotal}
            mainSuffix="원"
            items={[
              {
                label: '투자 원금',
                value: result.principal,
                suffix: '원',
              },
              {
                label: '복리 순수 이자',
                value: result.compoundInterest,
                suffix: '원',
                highlight: true,
              },
              {
                label: '단리 계산 시 총액',
                value: result.simpleTotal,
                suffix: '원',
              },
              {
                label: '복리 효과 추가 이득 (단리 대비)',
                value: result.difference,
                suffix: '원',
                highlight: result.difference > 0,
              },
            ]}
          />

          {/* 거치 연수별 자산 증식 그래프 시뮬레이션 */}
          <div className="p-6 rounded-2xl bg-[#FBF8F0] border border-[#E2D8C2]">
            <h4 className="text-sm font-semibold text-[#2C2A24] mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#2F6B4F]" />
              <span>연도별 자산 성장 가치 (단리 vs 복리)</span>
            </h4>
            <div className="flex flex-col gap-3">
              {result.yearlyData
                .filter((_, idx, arr) => {
                  // 연차가 너무 많으면 균등하게 최대 5개 연도만 샘플링하여 쾌적하게 렌더링
                  if (arr.length <= 5) return true;
                  const step = Math.ceil(arr.length / 5);
                  return idx === 0 || (idx + 1) % step === 0 || idx === arr.length - 1;
                })
                .map((data) => {
                  const maxVal = result.compoundTotal;
                  const simplePercent = (data.simple / maxVal) * 100;
                  const compoundPercent = (data.compound / maxVal) * 100;

                  return (
                    <div key={data.year} className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs">
                      <span className="font-semibold text-[#6F695B] w-12">{data.year}년차</span>
                      <div className="flex-1 flex flex-col gap-1 bg-[#ECE4D2] p-2 rounded-lg border border-[#E2D8C2]">
                        {/* 단리 바 */}
                        <div className="flex items-center gap-2">
                          <span className="w-8 text-[10px] text-[#6F695B]">단리</span>
                          <div className="flex-1 h-3 bg-[#E2D8C2] rounded overflow-hidden">
                            <div
                              style={{ width: `${simplePercent}%` }}
                              className="h-full bg-[#6F695B] transition-all duration-300"
                            ></div>
                          </div>
                          <span className="font-mono font-medium text-[#6F695B] w-24 text-right">
                            {data.simple.toLocaleString()}원
                          </span>
                        </div>
                        {/* 복리 바 */}
                        <div className="flex items-center gap-2">
                          <span className="w-8 text-[10px] text-[#2F6B4F] font-semibold">복리</span>
                          <div className="flex-1 h-3 bg-[#E2D8C2] rounded overflow-hidden">
                            <div
                              style={{ width: `${compoundPercent}%` }}
                              className="h-full bg-[#2F6B4F] transition-all duration-300"
                            ></div>
                          </div>
                          <span className="font-mono font-bold text-[#2F6B4F] w-24 text-right">
                            {data.compound.toLocaleString()}원
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-[#ECE4D2] border border-dashed border-[#E2D8C2] text-center text-[#6F695B]">
          <p className="text-sm font-medium">거치 원금, 연이자율 및 연수를 정확하게 기입하시면 복리 수익 그래프가 그려집니다.</p>
        </div>
      )}
    </div>
  );
};
export default CompoundInterestCalculator;
