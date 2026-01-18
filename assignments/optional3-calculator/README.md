# Optional 3 – Simple Calculator (HTML / CSS / JavaScript)

## 프로젝트 개요
본 프로젝트는 **3주차 선택 과제**로,  
사용자로부터 **숫자 2개와 연산자 1개를 입력받아 단일 산술 연산을 수행하는 간단한 계산기**를 구현한 예제입니다.

HTML을 통해 UI 구조를 구성하고,  
CSS로 레이아웃과 스타일을 설계했으며,  
JavaScript를 사용해 **이벤트 처리 및 계산 로직**을 구현했습니다.

---

## 구현 범위
- 숫자 2개(A, B) 입력
- 연산자 선택 (`+`, `-`, `*`, `/`)
- 1회 산술 연산 수행
- 입력값 검증 및 예외 처리(예: 0으로 나누기)
- 결과 및 안내 메시지 화면 출력

> 여러 단계의 누적 연산이나 수식 파싱 기능은 범위에서 제외했습니다.

---

## 사용된 이벤트
- **submit**
  - 계산 버튼 클릭 또는 Enter 입력 시 실행
  - 입력값 검증 후 계산 수행
  - 기본 폼 새로고침 동작 방지

- **click**
  - 초기화 버튼 클릭 시 입력값 및 결과 초기화

---

## 주요 함수 설명
- **parseNumber(value)**  
  사용자 입력값을 숫자로 변환하고 유효성을 검사합니다.

- **calculate(a, op, b)**  
  선택된 연산자에 따라 산술 연산을 수행하며,  
  0으로 나누는 경우와 같은 예외 상황을 처리합니다.

- **render(message, result)**  
  계산 결과 및 상태 메시지를 화면에 출력합니다.

---

## 프로그램 동작 흐름
1. 사용자가 숫자 A, 연산자, 숫자 B를 입력합니다.
2. 계산 버튼 클릭 시 submit 이벤트가 발생합니다.
3. 입력값 유효성 검증 후 연산을 수행합니다.
4. 정상 입력 시 결과가 화면에 출력됩니다.
5. 오류 발생 시 안내 메시지가 출력됩니다.
6. 초기화 버튼 클릭 시 입력값과 결과가 초기 상태로 돌아갑니다.

---

## 디렉터리 구조
optional3-calculator/  
├── index.html  
├── style.css  
├── main.js  
└── README.md  

---

## 사용 기술
- HTML5
- CSS3 (Grid / Flex Layout)
- JavaScript (DOM Manipulation, Event Handling)

---

## 링크
https://cxo-ca.github.io/commento-frontend-intro/assignments/optional3-calculator/

---

## 제한 사항 및 향후 개선 사항
- 누적 연산 및 수식 입력 기능은 미구현
- 키보드 단축 입력은 지원하지 않음
- 추후 JavaScript 로직 확장을 통해 기능 개선 가능
