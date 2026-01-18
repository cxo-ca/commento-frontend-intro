(() => {
  'use strict';

  // ========= Utilities =========
  const pad2 = (n) => String(n).padStart(2, '0');
  const buildKey = (h, m, s) => `${pad2(h)}:${pad2(m)}:${pad2(s)}`;

  const getNowParts = () => {
    const d = new Date();
    return { h: d.getHours(), m: d.getMinutes(), s: d.getSeconds() };
  };

  const nowKey = () => {
    const { h, m, s } = getNowParts();
    return buildKey(h, m, s);
  };

  const parseIntSafe = (v) => {
    if (v === '' || v === null || v === undefined) return null;
    const n = Number(v);
    if (!Number.isInteger(n)) return null;
    return n;
  };

  const validateTime = (h, m, s) => {
    if (h === null || m === null || s === null) return { ok: false, msg: '시/분/초를 모두 입력해주세요.' };
    if (h < 0 || h > 23) return { ok: false, msg: '시는 0~23 범위입니다.' };
    if (m < 0 || m > 59) return { ok: false, msg: '분은 0~59 범위입니다.' };
    if (s < 0 || s > 59) return { ok: false, msg: '초는 0~59 범위입니다.' };
    return { ok: true, msg: '' };
  };

  const uuid = () => {
    try {
      return crypto.randomUUID();
    } catch {
      return String(Date.now()) + '-' + String(Math.random());
    }
  };

  // ========= DOM =========
  const batteryText = document.getElementById('batteryText');
  const batteryBar = document.getElementById('batteryBar');
  const batteryFill = document.getElementById('batteryFill');
  const screen = document.getElementById('screen');
  const timeText = document.getElementById('timeText');

  const alarmForm = document.getElementById('alarmForm');
  const hourInput = document.getElementById('hourInput');
  const minuteInput = document.getElementById('minuteInput');
  const secondInput = document.getElementById('secondInput');
  const clearInputsBtn = document.getElementById('clearInputsBtn');
  const formMsg = document.getElementById('formMsg');
  const alarmList = document.getElementById('alarmList');

  const modal = document.getElementById('modal');
  const modalDesc = document.getElementById('modalDesc');
  const snoozeBtn = document.getElementById('snoozeBtn');
  const dismissBtn = document.getElementById('dismissBtn');

  // ========= State (Observer style) =========
  const State = (() => {
    const _state = {
      battery: 100,
      isDead: false,
      alarms: [],
      ringingAlarmId: null,
      lastTriggeredKey: ''
    };

    const listeners = [];

    const get = () => ({ ..._state, alarms: [..._state.alarms] });

    const notify = () => {
      const snapshot = get();
      listeners.forEach((fn) => fn(snapshot));
    };

    const subscribe = (fn) => {
      listeners.push(fn);
      fn(get());
    };

    const setBattery = (val) => {
      _state.battery = Math.max(0, Math.min(100, val));
      _state.isDead = _state.battery <= 0;
      notify();
    };

    const addAlarm = ({ h, m, s }) => {
      if (_state.alarms.length >= 3) return { ok: false, msg: '알람은 최대 3개까지 추가할 수 있습니다.' };

      const key = buildKey(h, m, s);
      if (_state.alarms.some(a => a.key === key)) return { ok: false, msg: '동일한 시간이 이미 등록되어 있습니다.' };

      _state.alarms.push({ id: uuid(), h, m, s, key });
      notify();
      return { ok: true, msg: `알람이 추가되었습니다: ${key}` };
    };

    const removeAlarm = (id) => {
      _state.alarms = _state.alarms.filter(a => a.id !== id);
      if (_state.ringingAlarmId === id) _state.ringingAlarmId = null;
      notify();
    };

    const updateAlarmTime = (id, { h, m, s }) => {
      const idx = _state.alarms.findIndex(a => a.id === id);
      if (idx < 0) return;
      const key = buildKey(h, m, s);
      _state.alarms[idx] = { ..._state.alarms[idx], h, m, s, key };
      notify();
    };

    const setRingingAlarm = (id, nowKeyStr) => {
      _state.ringingAlarmId = id;
      _state.lastTriggeredKey = nowKeyStr;
      notify();
    };

    const clearRinging = () => {
      _state.ringingAlarmId = null;
      notify();
    };

    const setLastTriggeredKey = (key) => {
      _state.lastTriggeredKey = key;
    };

    return {
      subscribe,
      setBattery,
      addAlarm,
      removeAlarm,
      updateAlarmTime,
      setRingingAlarm,
      clearRinging,
      setLastTriggeredKey,
      get
    };
  })();

  // ========= View (Rendering) =========
  const setMsg = (m) => { formMsg.textContent = m; };

  const renderBattery = (battery) => {
    batteryText.textContent = `${battery}%`;
    batteryFill.style.width = `${battery}%`;
    batteryBar.setAttribute('aria-valuenow', String(battery));

    // 단순 시각 피드백 (선택)
    if (battery <= 15) batteryFill.style.background = 'rgba(255, 200, 80, 0.85)';
    else batteryFill.style.background = 'rgba(190, 255, 210, 0.80)';
  };

  const renderDead = (isDead) => {
    if (isDead) screen.classList.add('is-dead');
    else screen.classList.remove('is-dead');
  };

  // XSS + 성능: DocumentFragment + createElement + textContent
  const renderAlarms = (alarms) => {
    const fragment = document.createDocumentFragment();
    alarmList.innerHTML = '';

    if (alarms.length === 0) {
      const empty = document.createElement('li');
      empty.className = 'clk-small';
      empty.textContent = '등록된 알람이 없습니다.';
      fragment.appendChild(empty);
      alarmList.appendChild(fragment);
      return;
    }

    alarms.forEach((a) => {
      const li = document.createElement('li');
      li.className = 'clk-item';
      li.setAttribute('role', 'listitem');

      const left = document.createElement('div');

      const t = document.createElement('div');
      t.className = 'clk-item__time';
      t.textContent = a.key;

      const meta = document.createElement('div');
      meta.className = 'clk-item__meta';
      meta.textContent = '알람';

      left.appendChild(t);
      left.appendChild(meta);

      const right = document.createElement('div');
      right.className = 'clk-item__right';

      const del = document.createElement('button');
      del.type = 'button';
      del.className = 'clk-del';
      del.textContent = '삭제';
      del.addEventListener('click', () => {
        State.removeAlarm(a.id);
        setMsg('알람이 삭제되었습니다.');
      });

      right.appendChild(del);

      li.appendChild(left);
      li.appendChild(right);

      fragment.appendChild(li);
    });

    alarmList.appendChild(fragment);
  };

  const openModal = (alarmKey) => {
    modalDesc.textContent = `알람 시간: ${alarmKey}`;
    modal.hidden = false;
  };

  const closeModal = () => {
    modal.hidden = true;
    State.clearRinging();
  };

  // ========= Audio (optional) =========
  const beep = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.value = 880;
      gain.gain.value = 0.06;

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      setTimeout(() => {
        osc.stop();
        ctx.close();
      }, 350);
    } catch {
      // ignore
    }
  };

  // ========= Controller (SRP 분리) =========
  const BatteryController = {
    tick() {
      const s = State.get();
      if (s.battery <= 0) return;
      State.setBattery(s.battery - 1);
    }
  };

  const ClockController = {
    tick() {
      const s = State.get();
      if (s.isDead) return;
      timeText.textContent = nowKey();
    }
  };

  const AlarmController = {
    tryTrigger() {
      const s = State.get();
      if (s.isDead) return;

      const key = nowKey();
      if (key === s.lastTriggeredKey) return;

      const found = s.alarms.find(a => a.key === key);
      if (!found) return;

      State.setRingingAlarm(found.id, key);
      beep();
      openModal(found.key);
    },

    addFromInputs() {
      const h = parseIntSafe(hourInput.value);
      const m = parseIntSafe(minuteInput.value);
      const s = parseIntSafe(secondInput.value);

      const v = validateTime(h, m, s);
      if (!v.ok) {
        setMsg(v.msg);
        return;
      }

      const out = State.addAlarm({ h, m, s });
      setMsg(out.msg);
    },

    clearInputs() {
      hourInput.value = '';
      minuteInput.value = '';
      secondInput.value = '';
      setMsg('입력을 초기화했습니다.');
    },

    snooze5min() {
      const s = State.get();
      const id = s.ringingAlarmId;
      if (!id) return;

      const alarm = s.alarms.find(a => a.id === id);
      if (!alarm) return;

      const total = (alarm.h * 3600) + (alarm.m * 60) + alarm.s;
      const plus = (total + (5 * 60)) % (24 * 3600);

      const nh = Math.floor(plus / 3600);
      const nm = Math.floor((plus % 3600) / 60);
      const ns = plus % 60;

      State.updateAlarmTime(id, { h: nh, m: nm, s: ns });
      setMsg(`Snooze 적용: ${buildKey(nh, nm, ns)}`);
      closeModal();
    },

    dismiss() {
      const s = State.get();
      const id = s.ringingAlarmId;
      if (!id) return;

      State.removeAlarm(id);
      setMsg('알람을 종료(삭제)했습니다.');
      closeModal();
    }
  };

  // ========= App Tick =========
  // tick 내부 SRP 분리: 시간 → 알람 체크 → 배터리
  const tick = () => {
    ClockController.tick();
    AlarmController.tryTrigger();
    BatteryController.tick();
  };

  // ========= State subscription (View binding) =========
  State.subscribe((snapshot) => {
    renderBattery(snapshot.battery);
    renderDead(snapshot.isDead);
    renderAlarms(snapshot.alarms);
  });

  // ========= Events =========
  alarmForm.addEventListener('submit', (e) => {
    e.preventDefault(); // form 기본 submit(새로고침) 방지
    AlarmController.addFromInputs();
  });

  clearInputsBtn.addEventListener('click', () => {
    AlarmController.clearInputs();
  });

  snoozeBtn.addEventListener('click', () => {
    AlarmController.snooze5min();
  });

  dismissBtn.addEventListener('click', () => {
    AlarmController.dismiss();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // ========= Boot =========
  // 초기 시간 표시
  timeText.textContent = nowKey();
  // 1초마다 tick
  setInterval(tick, 1000);
})();
