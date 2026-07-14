export interface DdayResult {
  daysDifference: number;
  rawDiffDays: number;
  displayText: string;
}

export interface DateAddResult {
  targetDateStr: string;
}

/**
 * 두 날짜 사이의 D-Day를 계산합니다.
 */
export function calculateDday(
  startStr: string,
  endStr: string,
  includeStartDay: boolean
): DdayResult {
  const start = new Date(startStr);
  const end = new Date(endStr);
  
  // 시간 성분을 제로화하여 일 단위 정밀 연산 보장
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const diffMs = end.getTime() - start.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  let daysDifference = diffDays;
  if (includeStartDay) {
    // 오늘을 1일로 포함할 경우
    daysDifference = diffDays >= 0 ? diffDays + 1 : diffDays - 1;
  }

  let displayText = '';
  if (diffDays === 0) {
    displayText = 'D-Day (오늘)';
  } else if (diffDays > 0) {
    displayText = includeStartDay ? `${daysDifference}일째` : `D-${daysDifference}`;
  } else {
    displayText = includeStartDay ? `${Math.abs(daysDifference)}일 지남` : `D+${Math.abs(daysDifference)}`;
  }

  return {
    daysDifference,
    rawDiffDays: diffDays,
    displayText,
  };
}

/**
 * 특정 일수를 더하거나 뺀 날짜를 반환합니다.
 */
export function calculateFutureDate(startStr: string, days: number): DateAddResult {
  const date = new Date(startStr);
  date.setDate(date.getDate() + days - 1); // 오늘을 1일로 치기 위해 -1 보정

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const dayName = daysOfWeek[date.getDay()];

  return {
    targetDateStr: `${year}년 ${month}월 ${day}일 (${dayName}요일)`,
  };
}
