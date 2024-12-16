// setInterval-n초마다반복, requestAnimationFrame-1초60번고정/브라우저기준

// DOM 요소 선택 함수
const get = (target) => {
  return document.querySelector(target);
};

// 시계 바늘 요소 선택
const $h_hour = get('.hand.hour');
const $h_minute = get('.hand.minute');
const $h_second = get('.hand.second');

// 아날로그 시계 함수
const AnalogClock = $container => {
  // 현재 시간 가져오기
  const date = new Date();
  const sec = date.getSeconds();
  const min = date.getMinutes();
  let hours = date.getHours();

  // 초침 각도 계산 및 업데이트
  const sec_angle = sec * 6;  // 초당 6도
  $h_second.style.setProperty('--deg', sec_angle);

  // 분침 각도 계산 및 업데이트
  const min_angle = min * 6;  // 분당 6도 + 초당 미세 이동 /분침이 초당 0.1도씩
  $h_minute.style.setProperty('--deg', min_angle);

  // 시침 각도 계산 및 업데이트
  if (hours >= 12) hours -= 12;  // 12시간제 변환


  const hours_angle = (hours * 30) + (min * 0.5);  // 시간당 30도 + 분당 미세 이동 /시침이 분당 0.5도씩
  $h_hour.style.setProperty('--deg', hours_angle);

  // 매초 시계를 업데이트하는 반복 호출
  requestAnimationFrame(AnalogClock, 1000); // 1초마다 업데이트
};

// 초기 상태 설정
AnalogClock(); // 첫 실행 시 바로 현재 시간 표시

export default AnalogClock;


/**
 * // 각 숫자는 30도 간격으로 배치됩니다(360도 ÷ 12 = 30도)
 * // 시 바늘: hour * 30도 + minute * 0.5도 (12시간 기준: 한 시간에 30도)
 * // 분 바늘: minute * 6도 (60분 기준: 한 분에 6도)
 * // 초 바늘: second * 6도 (60분 기준: 한 분에 6도)
 *
 * 초침이 시간에서 다음 시간으로 이동 5회
 * 5회 x 1분 x 6도 = 30도
 * 시간당 30도
 * 분당 0.5도
 *
 * 예) 4시
 * 120도 (4시 x 30도)
 *
 * 예) 4시 30분
 * 120도 + 15도 (30도 / 60분 x 30분)
 *
 * 예) 4시 45분
 * 120도 + 22.5 (30도 / 60분 x 45분)
 *
 */
