export interface AgeResult {
  birthDateStr: string;
  baseDateStr: string;
  internationalAge: number; // 만나이
  calendarAge: number; // 연나이
  zodiacSign: string; // 띠 (12지신)
  starSign: string; // 별자리 (12성좌)
  isBirthdayToday: boolean; // 오늘이 생일인지 여부
}

/**
 * 띠를 구합니다.
 */
function getZodiac(year: number): string {
  const zodiacs = ['원숭이띠 (申)', '닭띠 (酉)', '개띠 (戌)', '돼지띠 (亥)', '쥐띠 (子)', '소띠 (丑)', '호랑이띠 (寅)', '토끼띠 (卯)', '용띠 (辰)', '뱀띠 (巳)', '말띠 (午)', '양띠 (未)'];
  // 1900년은 쥐띠 (자) -> 1900 % 12 = 4
  // 0: 원숭이, 1: 닭, 2: 개, 3: 돼지, 4: 쥐...
  return zodiacs[year % 12];
}

/**
 * 별자리를 구합니다.
 */
function getStarSign(month: number, day: number): string {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return '양자리 (Aries)';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return '황소자리 (Taurus)';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) return '쌍둥이자리 (Gemini)';
  if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) return '게자리 (Cancer)';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return '사자자리 (Leo)';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 23)) return '처녀자리 (Virgo)';
  if ((month === 9 && day >= 24) || (month === 10 && day <= 22)) return '천칭자리 (Libra)';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 22)) return '전갈자리 (Scorpio)';
  if ((month === 11 && day >= 23) || (month === 12 && day <= 24)) return '사수자리 (Sagittarius)';
  if ((month === 12 && day >= 25) || (month === 1 && day <= 19)) return '염소자리 (Capricorn)';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return '물병자리 (Aquarius)';
  return '물고기자리 (Pisces)';
}

/**
 * 생년월일과 기준일에 따라 만나이 및 상세 정보를 구합니다.
 */
export function calculateAge(birthStr: string, baseStr: string): AgeResult {
  const birth = new Date(birthStr);
  const base = new Date(baseStr);

  const birthYear = birth.getFullYear();
  const birthMonth = birth.getMonth() + 1;
  const birthDay = birth.getDate();

  const baseYear = base.getFullYear();
  const baseMonth = base.getMonth() + 1;
  const baseDay = base.getDate();

  // 1. 연나이 (단순 계산)
  const calendarAge = baseYear - birthYear;

  // 2. 만나이
  let internationalAge = baseYear - birthYear;
  let isBirthdayToday = false;

  if (baseMonth < birthMonth || (baseMonth === birthMonth && baseDay < birthDay)) {
    // 아직 생일이 지나지 않은 경우
    internationalAge -= 1;
  } else if (baseMonth === birthMonth && baseDay === birthDay) {
    isBirthdayToday = true;
  }

  return {
    birthDateStr: birthStr,
    baseDateStr: baseStr,
    internationalAge: Math.max(0, internationalAge),
    calendarAge: Math.max(0, calendarAge),
    zodiacSign: getZodiac(birthYear),
    starSign: getStarSign(birthMonth, birthDay),
    isBirthdayToday,
  };
}
