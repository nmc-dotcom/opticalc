import React, { useState, useEffect } from 'react';
import { NumberInput } from '../../../components/NumberInput';
import { ResultCard } from '../../../components/ResultCard';
import { ResetButton } from '../../../components/ResetButton';
import { calculateLoan, RepaymentType, LoanResult } from './logic';
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';

export const LoanCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<number | ''>(50000000); // 5천만원 기본값
  const [rateAnnual, setRateAnnual] = useState<number | ''>(4.5); // 4.5% 기본값
  const [termMonths, setTermMonths] = useState<number | ''>(24); // 24개월(2년) 기본값
  const [repaymentType, setRepaymentType] = useState<RepaymentType>('equalPrincipalInterest');
  const [result, setResult] = useState<LoanResult | null>(null);
  const [showSchedule, setShowSchedule] = useState(false);

  useEffect(() => {
    if (principal === '' || rateAnnual === '' || termMonths === '' || termMonths <= 0) {
      setResult(null);
      return;
    }
    setResult(calculateLoan(Number(principal), Number(rateAnnual), Number(termMonths), repaymentType));
  }, [principal, rateAnnual, termMonths, repaymentType]);

  const handleReset = () => {
    setPrincipal(50000000);
    setRateAnnual(4.5);
    setTermMonths(24);
    setRepaymentType('equalPrincipalInterest');
    setShowSchedule(false);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 상환방식 선택 탭 */}
      <div className="flex bg-[#ECE4D2] p-1 rounded-xl border border-[#E2D8C2] self-start flex-wrap gap-1">
        <button
          onClick={() => setRepaymentType('equalPrincipalInterest')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
            repaymentType === 'equalPrincipalInterest'
              ? 'bg-[#2F6B4F] text-white shadow-sm'
              : 'text-[#6F695B] hover:text-[#2C2A24]'
          }`}
        >
          원리금균등
        </button>
        <button
          onClick={() => setRepaymentType('equalPrincipal')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
            repaymentType === 'equalPrincipal'
              ? 'bg-[#2F6B4F] text-white shadow-sm'
              : 'text-[#6F695B] hover:text-[#2C2A24]'
          }`}
        >
          원금균등
        </button>
        <button
          onClick={() => setRepaymentType('maturity')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
            repaymentType === 'maturity'
              ? 'bg-[#2F6B4F] text-white shadow-sm'
              : 'text-[#6F695B] hover:text-[#2C2A24]'
          }`}
        >
          만기일시
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NumberInput
          id="loan-principal"
          label="대출 원금"
          value={principal}
          onChange={setPrincipal}
          suffix="원"
          min={0}
        />
        <NumberInput
          id="loan-rate"
          label="연 이자율"
          value={rateAnnual}
          onChange={setRateAnnual}
          suffix="%"
          min={0}
          max={100}
          step={0.1}
        />
        <NumberInput
          id="loan-term"
          label="대출 기간"
          value={termMonths}
          onChange={setTermMonths}
          suffix="개월"
          min={1}
          max={600}
        />
      </div>

      <div className="flex justify-end">
        <ResetButton onReset={handleReset} />
      </div>

      {result ? (
        <div className="flex flex-col gap-6">
          <ResultCard
            title="대출 상환 분석 결과"
            mainValue={result.totalPayment}
            mainSuffix="원"
            items={[
              {
                label: '대출 원금',
                value: Number(principal),
                suffix: '원',
              },
              {
                label: '총 이자 납부액',
                value: result.totalInterest,
                suffix: '원',
                highlight: true,
              },
              {
                label: '월 평균 납입금액',
                value: result.averageMonthly,
                suffix: '원/월',
              },
              {
                label: '첫째 달 납입금액',
                value: result.firstMonthPayment,
                suffix: '원',
              },
            ]}
          />

          {/* 상환 스케줄 보기 */}
          <div className="border border-[#E2D8C2] rounded-2xl overflow-hidden bg-[#FBF8F0]">
            <button
              onClick={() => setShowSchedule(!showSchedule)}
              className="w-full flex items-center justify-between px-6 py-4 bg-[#ECE4D2] hover:bg-[#E2D8C2] transition-colors duration-200 text-left cursor-pointer"
            >
              <div className="flex items-center gap-2 text-[#2F6B4F] font-semibold text-sm">
                <Calendar className="w-4 h-4" />
                <span>월별 상환 스케줄 시뮬레이션</span>
              </div>
              {showSchedule ? (
                <ChevronUp className="w-4 h-4 text-[#6F695B]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#6F695B]" />
              )}
            </button>

            {showSchedule && (
              <div className="max-h-[320px] overflow-y-auto border-t border-[#E2D8C2]">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#ECE4D2] text-[#6F695B] font-semibold border-b border-[#E2D8C2] sticky top-0">
                      <th className="p-3 pl-6">회차</th>
                      <th className="p-3">월 상환금</th>
                      <th className="p-3">납부 원금</th>
                      <th className="p-3">납부 이자</th>
                      <th className="p-3 pr-6 text-right">대출 잔액</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2D8C2] font-mono text-[#2C2A24]">
                    {result.schedule.map((item) => (
                      <tr key={item.month} className="hover:bg-[#ECE4D2]/50 transition-colors">
                        <td className="p-3 pl-6 font-semibold text-[#6F695B]">{item.month}회차</td>
                        <td className="p-3 font-semibold text-[#2F6B4F]">{item.payment.toLocaleString()}원</td>
                        <td className="p-3">{item.principal.toLocaleString()}원</td>
                        <td className="p-3 text-red-600/80">{item.interest.toLocaleString()}원</td>
                        <td className="p-3 pr-6 text-right font-semibold text-[#6F695B]">{item.remaining.toLocaleString()}원</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-[#ECE4D2] border border-dashed border-[#E2D8C2] text-center text-[#6F695B]">
          <p className="text-sm font-medium">원금, 이자율, 기간을 정확하게 입력하시면 최적의 스케줄이 계산됩니다.</p>
        </div>
      )}
    </div>
  );
};
export default LoanCalculator;
