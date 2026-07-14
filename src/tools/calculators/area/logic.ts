export interface AreaResult {
  valueM2: number;
  valuePy: number;
}

const PY_TO_M2 = 3.305785;
const M2_TO_PY = 0.3025;

/**
 * 제곱미터를 평수로 변환합니다.
 */
export function m2ToPy(m2: number): AreaResult {
  return {
    valueM2: m2,
    valuePy: Math.round(m2 * M2_TO_PY * 100) / 100,
  };
}

/**
 * 평수를 제곱미터로 변환합니다.
 */
export function pyToM2(py: number): AreaResult {
  return {
    valueM2: Math.round(py * PY_TO_M2 * 100) / 100,
    valuePy: py,
  };
}
