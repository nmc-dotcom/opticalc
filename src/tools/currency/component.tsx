import React, { useState, useEffect } from 'react';
import { NumberInput } from '../../components/NumberInput';
import { SelectInput } from '../../components/SelectInput';
import { ResultCard } from '../../components/ResultCard';
import { ResetButton } from '../../components/ResetButton';
import { ArrowLeftRight, TrendingUp, AlertTriangle } from 'lucide-react';
import { currencyList, convertCurrency, ConversionResult } from './logic';

export const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<number | ''>(100);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('KRW');
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    const calculate = async () => {
      if (amount === '' || amount <= 0) {
        setResult(null);
        return;
      }
      setLoading(true);
      try {
        const res = await convertCurrency(amount, fromCurrency, toCurrency);
        if (active) {
          setResult(res);
        }
      } catch (err) {
        console.error('환율 변환 중 오류:', err);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    calculate();
    return () => {
      active = false;
    };
  }, [amount, fromCurrency, toCurrency]);

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const handleReset = () => {
    setAmount(100);
    setFromCurrency('USD');
    setToCurrency('KRW');
    setResult(null);
  };

  const currencyOptions = currencyList.map((c) => ({
    value: c.code,
    label: `${c.code} - ${c.name}`,
  }));

  const fromSymbol = currencyList.find((c) => c.code === fromCurrency)?.symbol || '';
  const toSymbol = currencyList.find((c) => c.code === toCurrency)?.symbol || '';

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row items-end gap-4">
        <div className="flex-1 w-full">
          <NumberInput
            id="currency-amount"
            label="금액 입력"
            value={amount}
            onChange={setAmount}
            suffix={fromSymbol}
            min={0}
          />
        </div>
        <div className="flex-[2] w-full grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-end gap-4">
          <SelectInput
            id="currency-from"
            label="기준 통화"
            value={fromCurrency}
            onChange={setFromCurrency}
            options={currencyOptions}
          />
          <button
            onClick={handleSwap}
            className="p-3 rounded-xl border border-[#E2D8C2] bg-[#ECE4D2] hover:bg-[#E2D8C2] text-[#6F695B] hover:text-[#2C2A24] flex items-center justify-center cursor-pointer transition-all duration-200 self-end h-[50px] sm:w-[50px]"
            title="기준 통화와 대상 통화 바꾸기"
          >
            <ArrowLeftRight className="w-5 h-5 sm:rotate-0 rotate-90" />
          </button>
          <SelectInput
            id="currency-to"
            label="대상 통화"
            value={toCurrency}
            onChange={setToCurrency}
            options={currencyOptions}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <ResetButton onReset={handleReset} />
      </div>

      {loading ? (
        <div className="p-8 flex flex-col items-center justify-center gap-3 text-[#6F695B]">
          <div className="w-8 h-8 border-2 border-[#2F6B4F]/10 border-t-[#2F6B4F] rounded-full animate-spin"></div>
          <p className="text-sm">실시간 환율 데이터를 조회하고 있습니다...</p>
        </div>
      ) : result ? (
        <>
          {result.isFallback && (
            <div className="flex items-start gap-2.5 p-4 rounded-xl bg-[#FBF1E6] border border-[#EFD9BC] text-[#8A5A2A]">
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
              <p className="text-xs font-semibold leading-relaxed">
                실시간 환율 데이터를 가져오지 못해, {result.asOf ?? ''} 기준으로 저장된 참고용 환율을 표시하고 있습니다. 실제 거래에는 최신 고시 환율을 다시 확인해 주세요.
              </p>
            </div>
          )}
          <ResultCard
            title={`${fromCurrency} → ${toCurrency} 변환 결과`}
            mainValue={result.convertedAmount.toFixed(2)}
            mainSuffix={toSymbol}
            items={[
              {
                label: `현재 적용 환율 (1 ${fromCurrency})`,
                value: `1 ${fromCurrency} = ${result.rate.toFixed(4)} ${toCurrency}`,
              },
              {
                label: '기준 통화 원금',
                value: result.fromAmount.toLocaleString(),
                suffix: fromCurrency,
              },
              ...(result.asOf
                ? [
                    {
                      label: '환율 기준일 · 출처',
                      value: `${result.asOf} · ${result.source ?? ''}`,
                    },
                  ]
                : []),
            ]}
          />
        </>
      ) : (
        <div className="p-6 rounded-2xl bg-[#ECE4D2] border border-dashed border-[#E2D8C2] text-center text-[#6F695B]">
          <TrendingUp className="w-8 h-8 mx-auto mb-2 opacity-60 text-[#2F6B4F]" />
          <p className="text-sm font-medium">유효한 변환 금액을 입력하시면 실시간 계산 결과가 노출됩니다.</p>
        </div>
      )}
    </div>
  );
};
export default CurrencyConverter;
