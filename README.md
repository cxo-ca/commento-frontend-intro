# Commento Frontend Assignments

HTML·CSS·JavaScript로 **화면 구성 → 이벤트와 상태 관리 → 입력 검증**을 실습한 코멘토 프론트엔드 직무 부트캠프 과제입니다. 별도 프레임워크 없이 구현하고 GitHub Pages에 배포했습니다.

## 결과물 바로 보기

| 과제 | 구현 범위 | 데모 · 코드 |
|---|---|---|
| 1주차 · 자기소개 | HTML/CSS/JS 분리, 소개 페이지, Pages 배포 | [데모](https://cxo-ca.github.io/commento-frontend-intro/) · [HTML](index.html) |
| 2주차 · 자판기 UI | Grid/Flex 기반 상품·상태 패널 구성 | [데모](https://cxo-ca.github.io/commento-frontend-intro/assignments/task2-vending/) · [코드](assignments/task2-vending/) |
| 3주차 · 알람 시계 | 배터리 감소·블랙아웃, 알람 최대 3개, 스누즈 | [데모](https://cxo-ca.github.io/commento-frontend-intro/assignments/task3-clock/) · [JS](assignments/task3-clock/main.js) |
| 선택 과제 · 계산기 | 숫자 2개 사칙연산, 입력 검증, 0 나누기 처리 | [데모](https://cxo-ca.github.io/commento-frontend-intro/assignments/optional3-calculator/) · [JS](assignments/optional3-calculator/main.js) |
| 4주차 · To Do List + 회원가입 | 일정 추가·삭제, 아이디 중복·비밀번호 규칙 확인 | [데모](https://cxo-ca.github.io/commento-frontend-intro/assignments/task4-final/) · [JS](assignments/task4-final/main.js) |

**기술:** `HTML5` `CSS3` `JavaScript` `GitHub Pages`

## 구현 포인트

### 알람 시계: 상태 변경과 화면 갱신 분리

- `State`의 구독 구조로 배터리·알람 변경을 화면에 반영합니다.
- 시간 표시, 알람 확인, 배터리 감소를 각각의 Controller로 분리했습니다.
- 시·분·초 범위, 동일 시간 중복 등록, 최대 3개 제한을 확인합니다.
- 알람 목록은 `DocumentFragment`, `createElement`, `textContent`로 구성합니다.
- 추가 기능으로 **5분 스누즈**와 알람 종료·삭제를 구현했습니다.

과제 조건에 따라 배터리는 100%에서 시작해 1초마다 1%씩 감소합니다. 0%가 되면 화면을 검게 처리하고 시간·알람 확인을 중단합니다. 스누즈는 등록 시간을 5분 뒤로 변경하며, 배터리 소진 조건도 그대로 적용됩니다.

### 회원가입·일정: 입력 검증과 상태 관리

- 사용자·일정을 배열로 관리하고 추가·삭제 후 목록을 갱신합니다.
- 아이디 중복 확인에 300ms debounce를 적용했습니다.
- 비밀번호는 8자 이상이며 영문·숫자·지정 특수문자(`!@#$%^&*`) 포함 여부를 확인합니다.
- 일정 입력은 앞뒤 공백을 제거하고 빈 입력을 거절합니다.

브라우저 메모리 배열을 사용하는 실습입니다. **서버·DB·실제 인증 기능은 없으며, 새로고침하면 등록한 사용자와 일정이 초기화됩니다.**

### 레이아웃·기초 실습

- 자판기는 **HTML/CSS 화면 구성 과제**입니다. 상품 구매·결제·필터 동작은 구현 범위에 포함되지 않습니다.
- 시맨틱 태그와 `aria-label`, CSS 변수, `vm-` 클래스 접두어를 적용했습니다.
- [HTML/CSS 선택 과제](assignments/optional2/)에는 display, Float/Flex/Grid, 박스 모델, selector, table을 포함한 소개 페이지 예제가 있습니다.

## 로컬에서 보기

저장소를 내려받은 뒤 루트의 `index.html` 또는 각 과제 폴더의 `index.html`을 브라우저로 엽니다. 패키지 설치나 빌드 과정이 없습니다.

| 경로 | 내용 |
|---|---|
| [index.html](index.html) · [style.css](style.css) · [main.js](main.js) | 1주차 자기소개 페이지 |
| [assignments/](assignments/) | 주차별 과제와 과제별 README |
