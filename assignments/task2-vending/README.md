# Task 2 – Vending Machine UI (웹 화면 구성)

본 과제는 **프론트엔드 화면 레이아웃 구성 연습**을 목표로 한 과제입니다.  
실제 서비스의 자판기 화면을 가정하여, **기능 구현 없이 UI 구조와 레이아웃 설계에 집중**하였습니다.

---

## 📌 과제 목표
- HTML/CSS 기반 웹 페이지 레이아웃 설계
- Grid / Flex 레이아웃을 활용한 화면 구성
- 시맨틱 태그와 접근성을 고려한 구조 작성
- 실무에서 확장 가능한 클래스 네이밍 및 구조 설계

---

## 📐 화면 구성 개요
화면은 크게 세 영역으로 구성되어 있습니다.

1. **상단 영역(Header)**
   - 서비스 타이틀 및 필터 버튼(UI 전용)
2. **상품 영역(Products Panel)**
   - 자판기 상품 목록을 Grid 레이아웃으로 구성
   - 상품 카드 단위로 정보 표시
3. **상태 패널(Status Panel)**
   - 판매 지표, 알림, 결제 영역(UI 전용)

---

## 🧱 HTML 구조 설계
- 전체 페이지 컨테이너는 `div.page`
- 실제 주요 콘텐츠 영역은 `main.layout` 사용
- 상품 목록은 의미적으로 적절한 `<ul>/<li>` 구조 사용
- 접근성을 고려하여 `role="list"`, `role="listitem"` 적용

```html
<div class="vm-page">
  <header class="vm-topbar">...</header>
  <main class="vm-layout">
    <section class="vm-products-panel">...</section>
    <aside class="vm-status-panel">...</aside>
  </main>
  <footer class="vm-footer">...</footer>
</div>
```

## 🎨 CSS 설계 포인트
- `:root`에 CSS 변수를 정의하여 색상 및 테마 일관성 유지
- Grid 레이아웃을 활용한 상품 카드 배치
- 반응형을 고려한 기본 구조 설계
- BEM(Block Element Modifier) 규칙을 기반으로 클래스 구성
- 전역 클래스 충돌 방지를 위해 `vm-` prefix 사용

## ♿ 접근성 고려 사항
- 시맨틱 태그(`<header>`, `<main>`, `<section>`, `<aside>`, `<footer>`) 활용
- 상품 리스트에 `<ul>/<li>` 구조 적용
- `aria-label`, `role` 속성 명시로 스크린 리더 사용성 고려

## ⚠️ 제한 사항
- 본 과제는 **화면(UI) 구성 과제**로,  
  버튼 클릭, 구매, 필터링 등 **모든 기능은 구현하지 않았습니다.**
- JavaScript는 사용하지 않았으며, **HTML/CSS만으로 작성되었습니다.**

## 📁 파일 구성
## 🎨 CSS 설계 포인트
- `:root`에 CSS 변수를 정의하여 색상 및 테마 일관성 유지
- Grid 레이아웃을 활용한 상품 카드 배치
- 반응형을 고려한 기본 구조 설계
- BEM(Block Element Modifier) 규칙을 기반으로 클래스 구성
- 전역 클래스 충돌 방지를 위해 `vm-` prefix 사용

## ♿ 접근성 고려 사항
- 시맨틱 태그(`<header>`, `<main>`, `<section>`, `<aside>`, `<footer>`) 활용
- 상품 리스트에 `<ul>/<li>` 구조 적용
- `aria-label`, `role` 속성 명시로 스크린 리더 사용성 고려

## ⚠️ 제한 사항
- 본 과제는 **화면(UI) 구성 과제**로,  
  버튼 클릭, 구매, 필터링 등 **모든 기능은 구현하지 않았습니다.**
- JavaScript는 사용하지 않았으며, **HTML/CSS만으로 작성되었습니다.**

## 📁 파일 구성
task2-vending/  
├─ index.html  
└─ style.css


## 🔗 결과물 링크
- GitHub Pages  
  https://cxo-ca.github.io/commento-frontend-intro/assignments/task2-vending/

## 🧠 정리
- 실무 UI를 가정한 레이아웃 구조 설계 경험
- 시맨틱 마크업과 접근성의 중요성 이해
- 이후 JavaScript 기능 구현을 고려한 확장 가능한 구조로 작성
