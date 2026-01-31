# Commento Frontend Bootcamp – Assignments 

본 저장소는 Commento 프론트엔드 직무 부트캠프(OJT) 과제를 수행하며 작성한 결과물을 정리한 레포지토리입니다.  
각 주차별 과제는 `assignments/` 하위 폴더에 정리되어 있으며, GitHub Pages로 배포한 결과물 링크를 함께 제공합니다.

## Quick Links
- 메인 페이지(1주차): https://cxo-ca.github.io/commento-frontend-intro/
- 2주차(자판기 UI): https://cxo-ca.github.io/commento-frontend-intro/assignments/task2-vending/
- 3주차(알람 시계): https://cxo-ca.github.io/commento-frontend-intro/assignments/task3-clock/
- 3주차 선택(계산기): https://cxo-ca.github.io/commento-frontend-intro/assignments/optional3-calculator/
- 4주차(최종 프로젝트): https://cxo-ca.github.io/commento-frontend-intro/assignments/task4-final/

---

## 기술 스택
- HTML5 / CSS3 / JavaScript(Vanilla)
- Git / GitHub / GitHub Pages

---

## 디렉터리 구조
- `index.html`, `style.css`, `main.js`: 1주차 메인 페이지
- `assignments/`: 주차별 과제 폴더

---

## 1주차 – 개발 환경 구축 및 Pages 배포
### 목표
- GitHub Repository 생성 및 관리
- HTML / CSS / JavaScript 파일 분리
- 간단한 자기소개(인트로) 페이지 작성
- GitHub Pages 배포

### 결과물
- Pages: https://cxo-ca.github.io/commento-frontend-intro/
- 코드: `/index.html`, `/style.css`, `/main.js`

---

## 2주차 – 웹 화면 레이아웃 구성(선택 과제)
### 선택 주제
- 자판기 UI 화면 구성(기능 구현 없음, 레이아웃 중심)

### 주요 포인트
- Grid / Flex 기반 레이아웃 구성
- 시맨틱 태그 및 접근성 속성(aria-label, role) 기본 적용
- CSS 변수(:root) 활용으로 테마 일관성 확보
- 클래스 네이밍 충돌 방지를 위한 prefix 적용(예: vm-)

### 결과물
- Pages: https://cxo-ca.github.io/commento-frontend-intro/assignments/task2-vending/
- 코드: `/assignments/task2-vending/`

---

## 2주차 선택 과제(optional2) – HTML/CSS 개념 정리
### 정리 내용
- display 속성(block/inline)
- 레이아웃 방식(Float / Flex / Grid)
- 박스 모델(Content / Padding / Border / Margin)
- class / id 차이 및 CSS selector 예시
- 자기소개 HTML 페이지 작성(조건: table 포함, div 3개 이상, 레이아웃 명시)

### 결과물
- 코드: https://github.com/cxo-ca/commento-frontend-intro/tree/main/assignments/optional2

---

## 3주차 – 알람 시계(이벤트 기반 웹페이지)
### 요구사항 요약
- FR1 배터리: 100%에서 시작, 1초마다 1% 감소
- FR2 배터리 0% 시 시간 미표시 및 화면 블랙 처리
- FR3 알람 등록(시/분/초), 최대 3개까지 목록 갱신
- FR4 추가 기능 1개 적용

### 주요 포인트
- 상태(State) 기반으로 배터리/알람 데이터 관리
- DOM 업데이트 시 DocumentFragment 등으로 리렌더링 비용 최소화
- XSS 및 성능 관점에서 innerHTML 사용 최소화(노드 생성 방식 우선)

### 결과물
- Pages: https://cxo-ca.github.io/commento-frontend-intro/assignments/task3-clock/
- 코드: `/assignments/task3-clock/`

---

## 3주차 선택 과제(optional3) – 계산기
### 개요
- 숫자 2개 + 연산자 1개 기반의 단일 연산 처리(검증 포함)
- 이벤트 기반 입력 처리 및 결과 렌더링
- 예외 상황(0으로 나누기 등) 메시지 안내

### 결과물
- Pages: https://cxo-ca.github.io/commento-frontend-intro/assignments/optional3-calculator/
- 코드: `/assignments/optional3-calculator/`

---

## 4주차 – 최종 프로젝트(To Do List + 회원가입)
### To Do List
- FR1 일정 추가
- FR2 일정 삭제

### 회원가입
- FR1 DB 없이 배열에 사용자 정보 저장
- FR2 아이디 중복 체크
- FR3 비밀번호 규칙 검증(8자 이상, 영문/숫자/특수문자 포함)

### 주요 포인트
- 이벤트 흐름(input/submit/click)과 상태(State) 분리
- DOM 렌더링 시 DocumentFragment 기반 렌더링
- 사용자 입력 검증을 실시간 안내로 UX 개선

### 결과물
- Pages: https://cxo-ca.github.io/commento-frontend-intro/assignments/task4-final/
- 코드: https://github.com/cxo-ca/commento-frontend-intro/tree/main/assignments/task4-final

---

## 실행 방법(로컬)
1. 저장소 클론
2. `index.html` 또는 각 과제 폴더의 `index.html`을 브라우저로 실행

---

## 정리
- 1주차: 개발 환경 구축 및 Pages 배포
- 2주차: 레이아웃 중심 UI 구성(자판기)
- 3주차: 이벤트/상태 중심 알람 시계 + (선택) 계산기
- 4주차: 최종 프로젝트(To Do List + 회원가입)
