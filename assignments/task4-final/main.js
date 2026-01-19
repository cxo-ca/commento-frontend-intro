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

const isDuplicatedId = (id) =>
  State.users.some(user => user.id === id);

const validatePassword = (pw) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  return regex.test(pw);
};

userIdInput.addEventListener('input', () => {
  idMsg.textContent = isDuplicatedId(userIdInput.value)
    ? '이미 사용 중인 아이디입니다.'
    : '사용 가능한 아이디입니다.';
});

passwordInput.addEventListener('input', () => {
  pwMsg.textContent = validatePassword(passwordInput.value)
    ? '사용 가능한 비밀번호입니다.'
    : '8자 이상, 영문/숫자/특수문자 포함';
});

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const id = userIdInput.value;
  const pw = passwordInput.value;

  if (isDuplicatedId(id) || !validatePassword(pw)) return;

  State.users.push({ id, pw });
  alert('회원가입 완료');

  signupForm.reset();
  idMsg.textContent = '';
  pwMsg.textContent = '';
});

/* ===== To Do List ===== */
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

const renderTodos = () => {
  const fragment = document.createDocumentFragment();
  todoList.innerHTML = '';

  State.todos.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = todo.text;

    const btn = document.createElement('button');
    btn.textContent = '삭제';
    btn.addEventListener('click', () => {
      State.todos = State.todos.filter(t => t.id !== todo.id);
      renderTodos();
    });

    li.appendChild(btn);
    fragment.appendChild(li);
  });

  todoList.appendChild(fragment);
};

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!todoInput.value) return;

  State.todos.push({
    id: Date.now(),
    text: todoInput.value
  });

  todoInput.value = '';
  renderTodos();
});
