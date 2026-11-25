'use strict';
/* ============================================================
   AWAKENING — entrées, boîtes de dialogue, menus
   ============================================================ */
const Input = { held: {}, q: [], rep: {} };
const KEYMAP = {
  ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
  KeyW: 'up', KeyS: 'down', KeyA: 'left', KeyD: 'right',
  Space: 'a', Enter: 'a', KeyJ: 'a', KeyC: 'a',
  Backspace: 'b', ShiftLeft: 'b', ShiftRight: 'b', KeyK: 'b', KeyX: 'b',
  Escape: 'menu', KeyM: 'menu', KeyP: 'menu',
};
function pressBtn(b) { Input.q.push(b); audioInit(); }
window.addEventListener('keydown', e => {
  if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
  const b = KEYMAP[e.code];
  if (!b) return;
  e.preventDefault();
  if (!e.repeat) { Input.held[b] = true; pressBtn(b); if (['up', 'down', 'left', 'right'].includes(b)) Input.rep[b] = 0; }
});
window.addEventListener('keyup', e => { const b = KEYMAP[e.code]; if (b) { Input.held[b] = false; delete Input.rep[b]; } });
window.addEventListener('blur', () => { Input.held = {}; Input.rep = {}; });
function inputUpdate() {
  for (const d of ['up', 'down', 'left', 'right']) {
    if (Input.held[d]) {
      Input.rep[d] = (Input.rep[d] || 0) + 1;
      if (Input.rep[d] > 22 && (Input.rep[d] - 22) % 6 === 0) Input.q.push(d);
    }
  }
}
function heldDir() {
  if (Input.held.up) return 'up'; if (Input.held.down) return 'down';
  if (Input.held.left) return 'left'; if (Input.held.right) return 'right';
  return null;
}
function setupTouch() {
  const pad = document.getElementById('dpad');
  if (pad) {
    let pid = null;
    const setDir = (e) => {
      const r = pad.getBoundingClientRect();
      let dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      if (document.documentElement.classList.contains('rot')) [dx, dy] = [dy, -dx];   // écran tourné d'un quart de tour
      for (const d of ['up', 'down', 'left', 'right']) Input.held[d] = false;
      if (Math.hypot(dx, dy) < r.width * 0.12) { pad.dataset.dir = ''; return; }
      const d = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
      if (pad.dataset.dir !== d) { pressBtn(d); Input.rep[d] = 0; }
      Input.held[d] = true; pad.dataset.dir = d;
    };
    pad.addEventListener('pointerdown', e => { e.preventDefault(); pid = e.pointerId; pad.setPointerCapture(pid); setDir(e); });
    pad.addEventListener('pointermove', e => { if (e.pointerId === pid) setDir(e); });
    const end = e => { if (e.pointerId !== pid) return; pid = null; for (const d of ['up', 'down', 'left', 'right']) Input.held[d] = false; pad.dataset.dir = ''; Input.rep = {}; };
    pad.addEventListener('pointerup', end); pad.addEventListener('pointercancel', end);
  }
  document.querySelectorAll('[data-btn]').forEach(el => {
    const b = el.dataset.btn;
    el.addEventListener('pointerdown', e => { e.preventDefault(); el.setPointerCapture(e.pointerId); Input.held[b] = true; pressBtn(b); el.classList.add('down'); });
    const up = () => { Input.held[b] = false; el.classList.remove('down'); };
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up); el.addEventListener('lostpointercapture', up);
  });
}

// ---------- Pile d'interface ----------
const UI = { stack: [], tickers: new Set(), root: null };
function uiPush(h) { UI.stack.push(h); }
function uiPop(h) { const i = UI.stack.lastIndexOf(h); if (i >= 0) UI.stack.splice(i, 1); }
function uiTop() { return UI.stack[UI.stack.length - 1]; }
function el(cls, x, y, w, h, html) {
  const d = document.createElement('div');
  d.className = 'box ' + (cls || '');
  if (x != null) { d.style.left = (x / 240 * 100) + '%'; d.style.top = (y / 160 * 100) + '%'; }
  if (w != null) d.style.width = (w / 240 * 100) + '%';
  if (h != null) d.style.height = (h / 160 * 100) + '%';
  if (html != null) d.innerHTML = html;
  UI.root.appendChild(d);
  return d;
}
function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
function fmt(s) { return String(s).replace(/\{P\}/g, G ? G.name : '').replace(/\{R\}/g, G ? G.rival : ''); }
const wait = ms => new Promise(r => setTimeout(r, ms));

// ---------- Dialogue ----------
let dlgEl = null;
let textSpeed; // version définitive : chronique.js
function say(text, opt = {}) {
  if (Array.isArray(text)) return text.reduce((p, t) => p.then(() => say(t, opt)), Promise.resolve());
  if (typeof text === 'string' && !opt.hold && fmt(text).length > 118) {
    const parts = fmt(text).match(/[.!?…]*[^.!?…]+[.!?…»]*\s*/g) || [text]; const out = []; let cur = '';
    for (const p of parts) { if (cur && (cur + p).length > 118) { out.push(cur.trim()); cur = ''; } cur += p; }
    if (cur.trim()) out.push(cur.trim());
    if (out.length > 1) return say(out, opt);
  }
  return new Promise(res => {
    const full = fmt(typeof text === 'function' ? text() : text);
    const box = opt.battle ? battleTextEl() : (dlgEl || (dlgEl = el('dlg', 4, 112, 232, 44)));
    if (!opt.battle && typeof showPortrait === 'function') { const mm = /^([^:]{2,26}) : /.exec(full); showPortrait(opt.speaker ? fmt(opt.speaker) : mm ? mm[1] : null, full); }
    box.hidden = false;
    box.classList.remove('done');
    box.innerHTML = (opt.speaker ? `<div class="spk">${esc(fmt(opt.speaker))}</div>` : '') + '<div class="txt"></div><i class="more"></i>';
    const txt = box.querySelector('.txt');
    let shown = 0, done = false, timer = null, fin = false;
    const tick = () => {
      if (done) return;
      const before = Math.floor(shown);
      shown += textSpeed();
      if (Math.floor(shown) > before && Math.floor(shown) % 3 === 0) sfx('blip');
      if (shown >= full.length) { shown = full.length; done = true; box.classList.add('done'); if (opt.auto) timer = setTimeout(finish, opt.auto); if (opt.hold) finish(); }
      txt.textContent = full.slice(0, Math.floor(shown));
    };
    UI.tickers.add(tick);
    const h = { press(b) { if (b === 'a' || b === 'b') { if (!done) { shown = full.length - 0.01; } else finish(); } } };
    function finish() {
      if (fin) return; fin = true;
      if (timer) clearTimeout(timer);
      UI.tickers.delete(tick); uiPop(h);
      if (!opt.hold && !opt.keep) { if (opt.battle) box.innerHTML = ''; else { box.remove(); dlgEl = null; if (typeof hidePortrait === 'function') hidePortrait(); } }
      res();
    }
    uiPush(h);
  });
}
function closeDlg() { if (dlgEl) { dlgEl.remove(); dlgEl = null; } if (typeof hidePortrait === 'function') hidePortrait(); }

// ---------- Menus ----------
function menu(items, o = {}) {
  return new Promise(res => {
    const rows = Math.min(items.length, o.rows || 8);
    const lh = o.lh || 13;
    const w = o.w || 80;
    const bh = rows * lh + 10 + (o.title ? 12 : 0);
    const x = o.x != null ? o.x : 236 - w, y = o.y != null ? o.y : (o.above ? 110 - bh : 4);
    const box = el('menu ' + (o.cls || ''), x, y, w, bh);
    let sel = Math.max(0, Math.min(items.length - 1, o.sel || 0)), top = 0;
    const render = () => {
      if (sel < top) top = sel; if (sel >= top + rows) top = sel - rows + 1;
      let html = o.title ? `<div class="mt">${esc(o.title)}</div>` : '';
      for (let i = top; i < Math.min(items.length, top + rows); i++) {
        const it = items[i]; const lab = typeof it === 'string' ? it : it.label;
        html += `<div class="mi${i === sel ? ' sel' : ''}${it && it.disabled ? ' dis' : ''}" style="height:calc(var(--px) * ${lh})"><span>${esc(lab)}</span>${it && it.right != null ? `<b>${esc(it.right)}</b>` : ''}</div>`;
      }
      if (items.length > rows) html += `<div class="scroll">${top > 0 ? '<i class="up"></i>' : ''}${top + rows < items.length ? '<i class="dn"></i>' : ''}</div>`;
      box.innerHTML = html;
      if (o.onMove) o.onMove(sel);
    };
    render();
    const h = {
      press(b) {
        if (b === 'up') { sel = (sel - 1 + items.length) % items.length; sfx('move'); render(); }
        else if (b === 'down') { sel = (sel + 1) % items.length; sfx('move'); render(); }
        else if (b === 'a') { const it = items[sel]; if (it && it.disabled) { sfx('bump'); return; } sfx('select'); close(sel); }
        else if (b === 'b' && o.cancel !== false) { sfx('cancel'); close(-1); }
      },
    };
    function close(v) { uiPop(h); if (!o.keep) box.remove(); res(o.keep ? { v, box } : v); }
    uiPush(h);
  });
}
async function ask(text, opts = ['Oui', 'Non'], o = {}) {
  await say(text, { hold: true, keep: true, speaker: o.speaker });
  const r = await menu(opts, { x: 236 - (o.w || 50), y: 110 - (opts.length * 13 + 10), w: o.w || 50, cancel: true });
  closeDlg();
  return r;
}
function gridMenu(items, x, y, w, h, cols = 2, sel = 0, onMove) {
  return new Promise(res => {
    const box = el('menu grid', x, y, w, h);
    const render = () => {
      box.innerHTML = items.map((it, i) => `<div class="gi${i === sel ? ' sel' : ''}${it.disabled ? ' dis' : ''}" style="${it.color ? `--tc:${it.color}` : ''}">${esc(it.label || it)}</div>`).join('');
      box.style.gridTemplateColumns = `repeat(${cols},1fr)`;
      if (onMove) onMove(sel);
    };
    render();
    const n = items.length;
    const h2 = {
      press(b) {
        const r = Math.floor(sel / cols), c = sel % cols;
        let ns = sel;
        if (b === 'left' && c > 0) ns = sel - 1;
        if (b === 'right' && c < cols - 1 && sel + 1 < n) ns = sel + 1;
        if (b === 'up' && r > 0) ns = sel - cols;
        if (b === 'down' && sel + cols < n) ns = sel + cols;
        if (ns !== sel) { sel = ns; sfx('move'); render(); return; }
        if (b === 'a') { sfx('select'); uiPop(h2); box.remove(); res(sel); }
        if (b === 'b') { sfx('cancel'); uiPop(h2); box.remove(); res(-1); }
      },
    };
    uiPush(h2);
  });
}
function pickQty(max, price) {
  return new Promise(res => {
    const box = el('menu qty', 150, 70, 86, 28);
    let n = 1;
    const render = () => { box.innerHTML = `<div class="qrow"><span>× ${String(n).padStart(2, '0')}</span><b>${price != null ? fmtMoney(price * n) : ''}</b></div>`; };
    render();
    const h = {
      press(b) {
        if (b === 'up') n = n >= max ? 1 : n + 1;
        else if (b === 'down') n = n <= 1 ? max : n - 1;
        else if (b === 'right') n = Math.min(max, n + 10);
        else if (b === 'left') n = Math.max(1, n - 10);
        else if (b === 'a') { sfx('select'); uiPop(h); box.remove(); res(n); return; }
        else if (b === 'b') { sfx('cancel'); uiPop(h); box.remove(); res(0); return; }
        sfx('move'); render();
      },
    };
    uiPush(h);
  });
}
function waitKey() {
  return new Promise(res => { const h = { press(b) { if (b === 'a' || b === 'b') { uiPop(h); res(b); } } }; uiPush(h); });
}
let fadeEl = null;
async function fade(on, ms = 220) {
  if (!fadeEl) fadeEl = document.getElementById('fade');
  fadeEl.style.transitionDuration = ms + 'ms';
  fadeEl.style.opacity = on ? '1' : '0';
  await wait(ms + 20);
}
let locEl = null, locTimer = null;
function showLocation(name) {
  if (locEl) locEl.remove();
  locEl = el('loc', 4, 4, null, null, esc(name));
  clearTimeout(locTimer);
  locTimer = setTimeout(() => { if (locEl) { locEl.classList.add('out'); const e = locEl; setTimeout(() => e.remove(), 500); locEl = null; } }, 2200);
}
function toast(text, ms = 1600) {
  const t = el('toast', 60, 4, 120, null, esc(text));
  setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 400); }, ms);
}
function hpColor(f) { return f > 0.5 ? 'var(--hp-good)' : f > 0.2 ? 'var(--hp-mid)' : 'var(--hp-low)'; }
function typePill(t) { return `<span class="pill" style="--tc:${TC[t]}">${TN[t]}</span>`; }
function statusPill(s) { return s ? `<span class="pill st" style="--tc:${STATUS_COLOR[s]}">${STATUS_NAME[s]}</span>` : ''; }
