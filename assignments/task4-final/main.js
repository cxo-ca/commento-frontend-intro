'use strict';

const State = {
  users: [],
  todos: []
};

/* ===== 회원가입 ===== */
const signupForm = document.getElementById('signupForm');
const userIdInput = document.getElementById('userId');
const passwordInput = document.getElementById('password');
const idMsg = document.getElementById('idMsg');
const pwMsg = document.getElementById('pwMsg');

const userList = document.getElementById('userList');
const userCount = document.getElementById('userCount');

const normalizeId = (id) => id.trim(); // 필요 시 .toLowerCase() 추가 가능

const isDuplicatedId = (id) => {
  const nid = normalizeId(id);
  return State.users.some(u => u.id === nid);
};

const ALLOWED_SPECIALS = '!@#$%^&*';
const validatePassword = (pw) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  return regex.test(pw);
};

const renderUsers = () => {
  const fragment = document.createDocumentFragment();
  userList.innerHTML = '';

  userCount.textContent = `${State.users.length}명`;

  if (State.users.length === 0) {
    const li = document.createElement('li');
    li.textContent = '아직 등록된 사용자가 없습니다.';
    fragment.appendChild(li);
    userList.appendChild(fragment);
    return;
  }

  State.users.forEach((u, idx) => {
    const li = document.createElement('li');

    const left = document.createElement('span');
    left.textContent = `${idx + 1}. ${u.id}`;

    li.appendChild(left);
    fragment.appendChild(li);
  });

  userList.appendChild(fragment);
};

// input: 아이디 중복 체크
userIdInput.addEventListener('input', () => {
  const id = normalizeId(userIdInput.value);

  if (id.length === 0) {
    idMsg.textContent = '';
    return;
  }

  idMsg.textContent = isDuplicatedId(id)
    ? '이미 사용 중인 아이디입니다.'
    : '사용 가능한 아이디입니다.';
});

// input: 비밀번호 규칙 체크
passwordInput.addEventListener('input', () => {
  const pw = passwordInput.value;

  if (pw.length === 0) {
    pwMsg.textContent = '';
    return;
  }

  pwMsg.textContent = validatePassword(pw)
  ? '사용 가능한 비밀번호입니다.'
  : `8자 이상, 영문/숫자/특수문자 포함 (허용: ${ALLOWED_SPECIALS})`;
});

// submit: 최종 검증 + 배열 저장
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const id = normalizeId(userIdInput.value);
  const pw = passwordInput.value;

  // 빈 값 방지
  if (id.length === 0) {
    idMsg.textContent = '아이디를 입력해주세요.';
    return;
  }
  if (pw.length === 0) {
    pwMsg.textContent = '비밀번호를 입력해주세요.';
    return;
  }

  // 아이디 중복 체크 (FR2)
  if (isDuplicatedId(id)) {
    idMsg.textContent = '이미 사용 중인 아이디입니다.';
    return;
  }

  // 비밀번호 규칙 (FR3)
  if (!validatePassword(pw)) {
  pwMsg.textContent = `비밀번호 규칙을 만족해야 합니다. (허용 특수문자: ${ALLOWED_SPECIALS})`;
  return;
}

  // 배열 저장 (FR1)
  State.users.push({ id, pw });

  // UI 반영
  renderUsers();

  // 폼 초기화
  signupForm.reset();
  idMsg.textContent = '';
  pwMsg.textContent = '';

  alert('회원가입 완료');
});

/* ===== To Do List ===== */
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

const renderTodos = () => {
  const fragment = document.createDocumentFragment();
  todoList.innerHTML = '';

  if (State.todos.length === 0) {
    const li = document.createElement('li');
    li.textContent = '등록된 일정이 없습니다.';
    fragment.appendChild(li);
    todoList.appendChild(fragment);
    return;
  }

  State.todos.forEach(todo => {
    const li = document.createElement('li');

    const text = document.createElement('span');
    text.textContent = todo.text;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = '삭제';
    btn.addEventListener('click', () => {
      State.todos = State.todos.filter(t => t.id !== todo.id);
      renderTodos();
    });

    li.appendChild(text);
    li.appendChild(btn);
    fragment.appendChild(li);
  });

  todoList.appendChild(fragment);
};

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const text = todoInput.value.trim();
  if (text.length === 0) return;

  State.todos.push({
    id: Date.now(),
    text
  });

  todoInput.value = '';
  renderTodos();
});

// 초기 렌더
renderUsers();
renderTodos();
