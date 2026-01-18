# Task 3 – Interactive Clock (Battery + Alarm)

## 요구사항(FR)
- FR1: 배터리 100% 시작, 1초마다 1% 감소
- FR2: 배터리 0% 시 시간 미표시 + 화면 검은색
- FR3: 시/분/초 알람 추가 및 현황 업데이트 (최대 3개)
- FR4(추가기능): 알람 발생 시 Snooze(5분) 제공

## 피드백 반영 사항
- label/input: `for`와 `id`로 연결하고, label 내부에 input을 중첩하지 않도록 수정
- form: submit 동작이 의미 있는 영역에서만 사용하며 `preventDefault()`로 기본 새로고침 방지
- 렌더링: `DocumentFragment + createElement + textContent`로 리스트 렌더링(XSS 방지, Reflow/Repaint 최소화)
- 설계: 상태(State)와 UI 렌더링을 분리하고 Observer 형태로 UI가 상태를 구독하도록 구성
- SRP: tick 내부 로직(시간/알람/배터리)을 컨트롤러 단위로 분리

## 파일 구성
- index.html
- style.css
- main.js

## 실행
- GitHub Pages에서 폴더 경로로 접속  
https://cxo-ca.github.io/commento-frontend-intro/assignments/task3-clock/
