(() => {
  'use strict';

  const form = document.getElementById('calcForm');
  const aInput = document.getElementById('aInput');
  const bInput = document.getElementById('bInput');
  const opSelect = document.getElementById('opSelect');
  const resetBtn = document.getElementById('resetBtn');

  const msg = document.getElementById('msg');
  const resultText = document.getElementById('resultText');

  // message + result output
  const render = (message, result) => {
    msg.textContent = message ?? '';
    if (result !== undefined) resultText.textContent = String(result);
  };

  // parse and validate number input
  const parseNumber = (value) => {
    if (value === '' || value === null || value === undefined) return { ok: false, n: null };
    const n = Number(value);
    if (Number.isNaN(n)) return { ok: false, n: null };
    return { ok: true, n };
  };

  // calculate by operator
  const calculate = (a, op, b) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/':
        if (b === 0) return { err: '0으로 나눌 수 없습니다.' };
        return a / b;
      default:
        return { err: '지원하지 않는 연산자입니다.' };
    }
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const pa = parseNumber(aInput.value);
    const pb = parseNumber(bInput.value);

    if (!pa.ok || !pb.ok) {
      render('숫자 A/B를 올바르게 입력해주세요.', '-');
      return;
    }

    const op = opSelect.value;
    const out = calculate(pa.n, op, pb.n);

    if (typeof out === 'object' && out && out.err) {
      render(out.err, '-');
      return;
    }

    render('계산 완료', out);
  });

  resetBtn.addEventListener('click', () => {
    aInput.value = '';
    bInput.value = '';
    opSelect.value = '+';
    render('초기화 완료', '-');
  });

  render('숫자 2개와 연산자를 입력한 뒤 계산을 눌러주세요.', '-');
})();
