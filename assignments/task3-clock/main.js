(() => {
  'use strict';

  // ===== State =====
  let battery = 100;            // FR1
  let tickTimer = null;
  let lastTriggeredKey = '';    // prevent multi-trigger in same second
  const alarms = [];            // { id, h, m, s, key }

  // ===== DOM =====
  const batteryText = document.getElementById('batteryText');
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

  let activeAlarmId = null; // currently ringing alarm id

  // ===== Utils =====
  const pad2 = (n) => String(n).padStart(2, '0');

  const buildKey = (h, m, s) => `${pad2(h)}:${pad2(m)}:${pad2(s)}`;

  const nowKey = () => {
    const d = new Date();
    return buildKey(d.getHours(), d.getMinutes(), d.getSeconds());
  };

  const setMsg = (msg) => {
    formMsg.textContent = msg;
  };

  const updateBatteryUI = () => {
    batteryText.textContent = `${battery}%`;
    batteryFill.style.width = `${Math.max(0, Math.min(100, battery))}%`;

    const bar = batteryFill.parentElement;
    if (bar && bar.getAttribute) {
      bar.setAttribute('aria-valuenow', String(battery));
    }

    // optional visual: change fill based on level
    if (battery <= 15) {
      batteryFill.style.background = 'rgba(255, 200, 80, 0.85)';
    } else {
      batteryFill.style.background = 'rgba(190, 255, 210, 0.80)';
    }
  };

  const setDeadScreen = (isDead) => {
    if (isDead) {
      screen.classList.add('is-dead'); // FR2
    } else {
      screen.classList.remove('is-dead');
    }
  };

  // Simple beep (no external audio file)
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
    } catch (e) {
      // ignore if blocked
    }
  };

  // ===== Alarm rendering =====
  const renderAlarms = () => {
    alarmList.innerHTML = '';

    if (alarms.length === 0) {
      const empty = document.createElement('li');
      empty.className = 'clk-small';
      empty.textContent = '등록된 알람이 없습니다.';
      alarmList.appendChild(empty);
      return;
    }

    for (const a of alarms) {
      const li = document.createElement('li');
      li.className = 'clk-item';
      li.setAttribute('role', 'listitem');

      const left = document.createElement('div');
      const time = document.createElement('div');
      time.className = 'clk-item__time';
      time.textContent = a.key;

      const meta = document.createElement('div');
      meta.className = 'clk-item__meta';
      meta.textContent = '알람';

      left.appendChild(time);
      left.appendChild(meta);

      const right = document.createElement('div');
      right.className = 'clk-item__right';

      const tag = document.createElement('span');
      tag.className = `clk-tag ${battery === 0 ? 'clk-tag--warn' : 'clk-tag--ok'}`;
      tag.textContent = battery === 0 ? 'OFF' : 'ON';

      const del = document.createElement('button');
      del.type = 'button';
      del.className = 'clk-del';
      del.textContent = '삭제';
      del.addEventListener('click', () => {
        const idx = alarms.findIndex(x => x.id === a.id);
        if (idx >= 0) alarms.splice(idx, 1);
        renderAlarms();
        setMsg('알람이 삭제되었습니다.');
      });

      right.appendChild(tag);
      right.appendChild(del);

      li.appendChild(left);
      li.appendChild(right);

      alarmList.appendChild(li);
    }
  };

  // ===== Modal =====
  const openModal = (alarmKey) => {
    modalDesc.textContent = `알람 시간: ${alarmKey}`;
    modal.hidden = false;
  };

  const closeModal = () => {
    modal.hidden = true;
    activeAlarmId = null;
  };

  const getAlarmById = (id) => alarms.find(a => a.id === id);

  // 추가기능(FR4): Snooze 5분
  const snoozeActiveAlarm = () => {
    const a = getAlarmById(activeAlarmId);
    if (!a) return;

    // 5 minutes later from original alarm time (HH:MM:SS)
    const total = (a.h * 3600) + (a.m * 60) + a.s;
    const plus = (total + (5 * 60)) % (24 * 3600);

    const nh = Math.floor(plus / 3600);
    const nm = Math.floor((plus % 3600) / 60);
    const ns = plus % 60;

    a.h = nh; a.m = nm; a.s = ns;
    a.key = buildKey(nh, nm, ns);

    renderAlarms();
    setMsg(`Snooze 적용: ${a.key}`);
    closeModal();
  };

  const dismissActiveAlarm = () => {
    const idx = alarms.findIndex(a => a.id === activeAlarmId);
    if (idx >= 0) alarms.splice(idx, 1);
    renderAlarms();
    setMsg('알람을 종료(삭제)했습니다.');
    closeModal();
  };

  // ===== Validation =====
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

  // ===== Tick =====
  const tick = () => {
    // battery 0 -> dead screen
    if (battery <= 0) {
      battery = 0;
      updateBatteryUI();
      setDeadScreen(true);
      return; // FR2: time not displayed
    }

    // show time
    const key = nowKey();
    timeText.textContent = key;

    // alarms check
    if (key !== lastTriggeredKey) {
      const found = alarms.find(a => a.key === key);
      if (found) {
        lastTriggeredKey = key;
        activeAlarmId = found.id;
        beep();
        openModal(found.key);
      }
    }

    // battery decrease (FR1)
    battery -= 1;
    updateBatteryUI();

    if (battery <= 0) {
      setDeadScreen(true);
    }
  };

  const start = () => {
    // initial state
    battery = 100;
    lastTriggeredKey = '';
    updateBatteryUI();
    setDeadScreen(false);
    renderAlarms();

    // show time immediately
    timeText.textContent = nowKey();

    if (tickTimer) clearInterval(tickTimer);
    tickTimer = setInterval(tick, 1000);
  };

  // ===== Events =====
  alarmForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (alarms.length >= 3) {
      setMsg('알람은 최대 3개까지 추가할 수 있습니다.');
      return;
    }

    const h = parseIntSafe(hourInput.value);
    const m = parseIntSafe(minuteInput.value);
    const s = parseIntSafe(secondInput.value);

    const v = validateTime(h, m, s);
    if (!v.ok) {
      setMsg(v.msg);
      return;
    }

    const key = buildKey(h, m, s);

    // avoid duplicates
    if (alarms.some(a => a.key === key)) {
      setMsg('동일한 시간이 이미 등록되어 있습니다.');
      return;
    }

    alarms.push({
      id: crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random(),
      h, m, s,
      key
    });

    renderAlarms();
    setMsg(`알람이 추가되었습니다: ${key}`);
  });

  clearInputsBtn.addEventListener('click', () => {
    hourInput.value = '';
    minuteInput.value = '';
    secondInput.value = '';
    setMsg('입력을 초기화했습니다.');
  });

  snoozeBtn.addEventListener('click', snoozeActiveAlarm);
  dismissBtn.addEventListener('click', dismissActiveAlarm);

  // close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // ===== Boot =====
  start();
})();
