'use strict';
/* ============================================================
   AWAKENING — son et musique (WebAudio, généré)
   ============================================================ */
const SND = { ctx: null, master: null, musicGain: null, sfxGain: null, music: true, sfx: true, cur: null, timer: null, night: false };
function audioInit() {
  if (SND.ctx) { if (SND.ctx.state === 'suspended') SND.ctx.resume(); return; }
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    SND.ctx = new AC();
    SND.master = SND.ctx.createGain(); SND.master.gain.value = 0.6; SND.master.connect(SND.ctx.destination);
    SND.musicGain = SND.ctx.createGain(); SND.musicGain.gain.value = SND.music ? 0.5 : 0; SND.musicGain.connect(SND.master);
    SND.sfxGain = SND.ctx.createGain(); SND.sfxGain.gain.value = SND.sfx ? 0.7 : 0; SND.sfxGain.connect(SND.master);
    if (SND.pending) { const p = SND.pending; SND.pending = null; playMusic(p); }
  } catch (e) { SND.ctx = null; }
}
function setMusicOn(v) { SND.music = v; if (SND.musicGain) SND.musicGain.gain.value = v ? 0.5 : 0; }
function setSfxOn(v) { SND.sfx = v; if (SND.sfxGain) SND.sfxGain.gain.value = v ? 0.7 : 0; }
const NOTE_IDX = { C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5, 'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11 };
function noteFreq(n) {
  const m = /^([A-G][#b]?)(\d)$/.exec(n); if (!m) return 0;
  const midi = 12 * (parseInt(m[2]) + 1) + NOTE_IDX[m[1]];
  return 440 * Math.pow(2, (midi - 69) / 12);
}
function tone(freq, t, dur, type, vol, dest, slideTo) {
  if (!SND.ctx || !freq) return;
  const o = SND.ctx.createOscillator(), g = SND.ctx.createGain();
  o.type = type; o.frequency.setValueAtTime(freq, t);
  if (slideTo) o.frequency.linearRampToValueAtTime(slideTo, t + dur);
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + 0.008);
  g.gain.setValueAtTime(vol, t + Math.max(0.01, dur - 0.04)); g.gain.linearRampToValueAtTime(0, t + dur);
  o.connect(g); g.connect(dest || SND.sfxGain); o.start(t); o.stop(t + dur + 0.02);
}
let NOISE = null;
function noise(t, dur, vol, hp) {
  if (!SND.ctx) return;
  if (!NOISE) { NOISE = SND.ctx.createBuffer(1, SND.ctx.sampleRate * 0.5, SND.ctx.sampleRate); const d = NOISE.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; }
  const s = SND.ctx.createBufferSource(); s.buffer = NOISE;
  const f = SND.ctx.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = hp || 800;
  const g = SND.ctx.createGain(); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  s.connect(f); f.connect(g); g.connect(SND.sfxGain); s.start(t); s.stop(t + dur);
}
function sfx(name) {
  if (!SND.ctx || !SND.sfx) return;
  const t = SND.ctx.currentTime;
  switch (name) {
    case 'blip': tone(1046, t, 0.025, 'square', 0.05); break;
    case 'select': tone(784, t, 0.05, 'square', 0.08); tone(1175, t + 0.05, 0.07, 'square', 0.08); break;
    case 'move': tone(660, t, 0.03, 'square', 0.05); break;
    case 'cancel': tone(523, t, 0.05, 'square', 0.07); tone(392, t + 0.05, 0.07, 'square', 0.07); break;
    case 'bump': tone(110, t, 0.08, 'square', 0.1); break;
    case 'door': noise(t, 0.12, 0.2, 400); tone(330, t, 0.1, 'triangle', 0.1); break;
    case 'hit': noise(t, 0.18, 0.4, 600); tone(180, t, 0.12, 'square', 0.12, null, 70); break;
    case 'super': noise(t, 0.28, 0.5, 300); tone(240, t, 0.2, 'square', 0.14, null, 60); break;
    case 'weak': noise(t, 0.12, 0.25, 1200); break;
    case 'faint': tone(600, t, 0.5, 'square', 0.1, null, 80); break;
    case 'heal': [523, 659, 784, 1046, 784, 1046].forEach((f, i) => tone(f, t + i * 0.12, 0.14, 'square', 0.08)); break;
    case 'level': [523, 659, 784, 1046].forEach((f, i) => tone(f, t + i * 0.09, 0.12, 'square', 0.09)); tone(1318, t + 0.36, 0.3, 'square', 0.09); break;
    case 'item': [784, 988, 1175, 1568].forEach((f, i) => tone(f, t + i * 0.08, 0.1, 'square', 0.08)); break;
    case 'badge': [523, 523, 784, 1046, 988, 1046, 1318].forEach((f, i) => tone(f, t + i * 0.14, 0.16, 'square', 0.09)); break;
    case 'shake': tone(220, t, 0.06, 'square', 0.1); tone(180, t + 0.08, 0.06, 'square', 0.1); break;
    case 'caught': [784, 988, 1175, 1568, 1175, 1568].forEach((f, i) => tone(f, t + i * 0.1, 0.12, 'square', 0.08)); break;
    case 'throw': tone(400, t, 0.25, 'triangle', 0.12, null, 900); break;
    case 'encounter': for (let i = 0; i < 6; i++) tone(300 + i * 120, t + i * 0.05, 0.05, 'square', 0.08); break;
    case 'stat': tone(440, t, 0.25, 'square', 0.08, null, 880); break;
    case 'statdown': tone(880, t, 0.25, 'square', 0.08, null, 440); break;
    case 'status': noise(t, 0.3, 0.2, 2000); tone(300, t, 0.3, 'sawtooth', 0.05, null, 200); break;
    case 'save': tone(659, t, 0.1, 'square', 0.08); tone(988, t + 0.12, 0.2, 'square', 0.08); break;
    case 'evolve': for (let i = 0; i < 12; i++) tone(400 + i * 60, t + i * 0.07, 0.07, 'triangle', 0.1); break;
    case 'exclaim': tone(1318, t, 0.06, 'square', 0.09); tone(1568, t + 0.07, 0.1, 'square', 0.09); break;
    case 'surf': noise(t, 0.4, 0.15, 300); break;
    case 'cut': noise(t, 0.15, 0.3, 2500); break;
  }
}

// ---------- Séquenceur ----------
function oct(note, n) { let s = ''; for (let i = 0; i < n; i++) s += note.replace(/(\D+)(\d)/, (m, a, b) => `${a}${b}/1 ${a}${+b + 1}/1 `); return s; }
const SONGS = {
  title: { bpm: 80, lw: 'square', lead: 'E5/2 G5/2 C6/4 B5/2 G5/2 E5/4 F5/2 A5/2 G5/4 E5/2 D5/2 C5/4 D5/2 E5/2 G5/4 A5/2 G5/2 E5/4 D5/2 C5/2 D5/4 C5/8', bass: 'C3/8 A2/8 F2/8 G2/8 C3/8 A2/8 F2/4 G2/4 C3/8' },
  town1: { bpm: 100, lw: 'square', lead: 'A4/2 C5/2 F5/2 E5/2 D5/2 C5/2 A4/4 Bb4/2 D5/2 F5/2 D5/2 C5/4 -/4 A4/2 C5/2 F5/2 G5/2 A5/2 G5/2 F5/4 E5/2 G5/2 C5/2 E5/2 F5/6 -/2', bass: 'F2/4 C3/4 F2/4 A2/4 Bb2/4 F3/4 C3/4 C2/4 F2/4 A2/4 D3/4 C3/4 Bb2/4 C3/4 F2/8' },
  town2: { bpm: 92, lw: 'triangle', lead: 'D5/2 E5/2 F5/2 A5/2 G5/4 E5/4 F5/2 E5/2 D5/2 C5/2 D5/8 A4/2 C5/2 D5/2 F5/2 E5/4 C5/4 D5/2 F5/2 E5/2 C5/2 D5/8', bass: 'D3/8 C3/8 Bb2/8 A2/8 D3/8 F2/8 G2/8 D3/8' },
  route: { bpm: 128, lw: 'square', lead: 'G4/1 B4/1 D5/2 D5/1 E5/1 D5/2 B4/2 G4/2 A4/2 B4/1 C5/1 D5/4 E5/1 F#5/1 G5/2 F#5/2 E5/2 D5/2 C5/2 B4/2 A4/4 G4/1 A4/1 B4/2 D5/2 G5/2 F#5/2 E5/2 D5/2 C5/2 A4/2 B4/4 G4/4', bass: 'G2/2 D3/2 G2/2 D3/2 C3/2 G3/2 C3/2 G3/2 G2/2 D3/2 G2/2 D3/2 D3/2 A3/2 D3/2 A3/2 E3/2 B3/2 E3/2 B3/2 C3/2 G3/2 C3/2 G3/2 D3/2 A3/2 D3/2 F#3/2 G2/2 D3/2 G2/4' },
  route2: { bpm: 116, lw: 'square', lead: 'E5/2 B4/2 E5/2 F#5/2 G5/4 F#5/2 E5/2 D5/2 A4/2 D5/2 E5/2 F#5/4 -/4 G5/2 F#5/2 E5/2 D5/2 C5/2 D5/2 E5/4 B4/2 C5/2 D5/2 B4/2 E5/8', bass: 'E2/4 B2/4 E2/4 B2/4 D2/4 A2/4 D2/4 A2/4 C2/4 G2/4 C2/4 G2/4 B1/4 F#2/4 E2/8' },
  battle: { bpm: 150, lw: 'square', lead: 'A4/1 C5/1 E5/1 A5/1 G5/2 E5/2 F5/1 E5/1 D5/1 C5/1 B4/2 E5/2 A4/1 C5/1 E5/1 A5/1 B5/2 G5/2 A5/4 -/4 F5/1 G5/1 A5/2 G5/1 F5/1 E5/2 D5/1 E5/1 F5/2 E5/1 D5/1 C5/2 B4/1 C5/1 D5/2 E5/2 G#4/2 A4/4 E5/4', bass: oct('A2', 4) + oct('F2', 2) + oct('G2', 2) + oct('A2', 4) + oct('F2', 2) + oct('G2', 2) + oct('D2', 4) + oct('E2', 4) + oct('F2', 2) + oct('G2', 2) + oct('E2', 2) + 'E2/2 E3/2' },
  trainer: { bpm: 160, lw: 'square', lead: 'D5/1 F5/1 A5/2 G5/1 F5/1 E5/2 F5/1 E5/1 D5/2 C#5/2 A4/2 D5/1 F5/1 A5/2 C6/2 Bb5/2 A5/4 -/4 Bb5/1 A5/1 G5/2 F5/1 G5/1 A5/2 G5/1 F5/1 E5/2 D5/1 E5/1 F5/2 E5/1 F5/1 G5/2 A5/2 C#5/2 D5/4 A4/4', bass: oct('D2', 8) + oct('Bb1', 4) + oct('A1', 4) + oct('D2', 4) + oct('G1', 4) + oct('Bb1', 2) + oct('A1', 2) + oct('D2', 4) },
  boss: { bpm: 172, lw: 'sawtooth', lead: 'E5/1 E5/1 G5/1 E5/1 A5/2 G5/2 E5/1 D5/1 E5/2 B4/4 E5/1 E5/1 G5/1 E5/1 B5/2 A5/2 G5/2 F#5/2 E5/4 C5/1 D5/1 E5/2 G5/2 A5/2 B5/1 A5/1 G5/2 E5/2 D5/2 B4/2 C5/2 D5/2 E5/4 -/4', bass: oct('E2', 8) + oct('C2', 4) + oct('D2', 4) + oct('A1', 4) + oct('B1', 4) + oct('E2', 8) },
  center: { bpm: 92, lw: 'triangle', lead: 'E5/2 G5/2 E5/2 C5/2 D5/2 F5/2 D5/4 E5/2 G5/2 C6/2 B5/2 A5/4 G5/4 F5/2 A5/2 G5/2 E5/2 D5/2 F5/2 E5/4 D5/2 E5/2 F5/2 D5/2 C5/8', bass: 'C3/4 G2/4 D3/4 G2/4 C3/4 E3/4 F2/4 G2/4 F2/4 C3/4 G2/4 C3/4 F2/4 G2/4 C3/8' },
  cave: { bpm: 90, lw: 'triangle', lead: 'E4/4 -/2 G4/2 F#4/4 -/4 E4/2 B3/2 C4/4 B3/8 E4/4 -/2 A4/2 G4/4 F#4/4 D#4/4 E4/4 -/8', bass: 'E2/8 C2/8 A1/8 B1/8 E2/8 C2/8 B1/8 E2/8' },
  sacred: { bpm: 70, lw: 'triangle', lead: 'A4/4 E5/4 D5/2 C5/2 B4/4 C5/4 E5/4 A5/8 G5/4 E5/4 F5/2 E5/2 D5/4 E5/8 -/8', bass: 'A2/8 F2/8 C3/8 G2/8 A2/8 F2/8 E2/8 E2/8' },
  somnis: { bpm: 140, lw: 'sawtooth', lead: 'C5/1 -/1 C5/1 Eb5/1 -/2 C5/2 G4/2 Ab4/2 Bb4/2 C5/4 C5/1 -/1 C5/1 Eb5/1 -/2 F5/2 Eb5/2 D5/2 Bb4/2 C5/4 Ab4/2 Bb4/2 C5/2 Eb5/2 F5/2 Eb5/2 D5/2 Bb4/2 C5/4 G4/4 C5/8', bass: oct('C2', 8) + oct('Ab1', 4) + oct('Bb1', 4) + oct('Ab1', 4) + oct('Bb1', 4) + oct('C2', 8) },
};
function parseSong(str) { return str.trim().split(/\s+/).map(tok => { const [n, d] = tok.split('/'); return [n, parseFloat(d || '1')]; }); }
const PARSED = {};
function playMusic(name) {
  if (!name) return;
  if (!SND.ctx) { SND.pending = name; return; }
  if (SND.cur && SND.cur.name === name) return;
  if (typeof SCORES !== 'undefined' && SCORES[name]) { playScore(name); return; }
  stopMusic();
  const song = SONGS[name]; if (!song) return;
  if (!PARSED[name]) PARSED[name] = { lead: parseSong(song.lead), bass: parseSong(song.bass), harm: song.harm ? parseSong(song.harm) : null, drum: song.drum ? parseSong(song.drum) : null };
  const p = PARSED[name];
  const cur = { name, song, tracks: [{ notes: p.lead, i: 0, t: 0, type: song.lw, vol: 0.07 }, { notes: p.bass, i: 0, t: 0, type: 'triangle', vol: 0.13 }] };
  if (p.harm) cur.tracks.push({ notes: p.harm, i: 0, t: 0, type: 'sawtooth', vol: 0.022 });
  if (p.drum) cur.tracks.push({ notes: p.drum, i: 0, t: 0, drum: true, vol: 0.2 });
  const start = SND.ctx.currentTime + 0.08;
  cur.tracks.forEach(tr => tr.t = start);
  SND.cur = cur;
  SND.timer = setInterval(() => schedule(cur), 40);
  schedule(cur);
}
function schedule(cur) {
  if (SND.cur !== cur || !SND.ctx) return;
  const eighth = 60 / cur.song.bpm / 2 * (SND.night && !/battle|trainer|boss|somnis/.test(cur.name) ? 1.12 : 1);
  const horizon = SND.ctx.currentTime + 0.25;
  for (const tr of cur.tracks) {
    let guard = 0;
    while (tr.t < horizon && guard++ < 64) {
      const [n, d] = tr.notes[tr.i];
      const dur = d * eighth;
      if (tr.drum) { if (n === 'k') { tone(130, tr.t, 0.12, 'triangle', 0.22, SND.musicGain, 40); } else if (n === 's') drumNoise(tr.t, 0.12, 0.16, 1400); else if (n === 'h') drumNoise(tr.t, 0.04, 0.06, 7000); }
      else if (n !== '-') {
        const type = SND.night && tr.type === 'square' && !/battle|trainer|boss|somnis/.test(cur.name) ? 'triangle' : tr.type;
        tone(noteFreq(n), tr.t, dur * 0.92, type, tr.vol, SND.musicGain);
      }
      tr.t += dur; tr.i = (tr.i + 1) % tr.notes.length;
    }
  }
}
function drumNoise(t, dur, vol, hp) {
  if (!SND.ctx) return;
  if (!NOISE) { NOISE = SND.ctx.createBuffer(1, SND.ctx.sampleRate * 0.5, SND.ctx.sampleRate); const d = NOISE.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; }
  const s = SND.ctx.createBufferSource(); s.buffer = NOISE;
  const f = SND.ctx.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = hp;
  const g = SND.ctx.createGain(); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  s.connect(f); f.connect(g); g.connect(SND.musicGain); s.start(t); s.stop(t + dur);
}
function stopMusic() { if (SND.timer) clearInterval(SND.timer); SND.timer = null; SND.cur = null; if (typeof stopScore === 'function') stopScore(); }

SONGS.epic = { bpm: 138, lw: 'square', lead: 'A4/4 D5/4 F5/4 E5/2 D5/2 C5/4 D5/4 A4/8 Bb4/4 C5/4 D5/4 F5/2 G5/2 A5/12 -/4 D5/2 D5/1 F5/1 A5/4 G5/2 F5/2 E5/2 F5/2 G5/4 C5/4 -/2 C5/2 D5/2 E5/2 F5/4 E5/2 D5/2 C5/2 D5/2 Bb4/4 A4/6 -/2 D5/2 D5/1 F5/1 A5/4 C6/4 Bb5/2 A5/2 G5/4 F5/4 E5/2 F5/2 G5/2 A5/2 Bb5/4 A5/2 G5/2 F5/2 E5/2 D5/16 A4/4 C5/4 D5/4 F5/2 G5/2 A5/4 A5/2 Bb5/2 C6/4 Bb5/2 A5/2 G5/2 F5/2 E5/8 D5/2 E5/2 F5/4 G5/2 A5/2 Bb5/4 A5/4 G5/4 A5/8', bass: 'D2/1 D3/1 D2/1 D3/1 D2/1 D3/1 D2/1 D3/1 D2/1 D3/1 D2/1 D3/1 D2/1 D3/1 D2/1 D3/1 Bb2/1 Bb3/1 Bb2/1 Bb3/1 Bb2/1 Bb3/1 Bb2/1 Bb3/1 C2/1 C3/1 C2/1 C3/1 C2/1 C3/1 C2/1 C3/1 D2/1 D3/1 D2/1 D3/1 D2/1 D3/1 D2/1 D3/1 D2/1 D3/1 D2/1 D3/1 D2/1 D3/1 D2/1 D3/1 Bb2/1 Bb3/1 Bb2/1 Bb3/1 Bb2/1 Bb3/1 Bb2/1 Bb3/1 A2/1 A3/1 A2/1 A3/1 A2/1 A3/1 A2/1 A3/1 D2/1 D3/1 D2/1 D3/1 D2/1 D3/1 D2/1 D3/1 D2/1 D3/1 D2/1 D3/1 D2/1 D3/1 D2/1 D3/1 C2/1 C3/1 C2/1 C3/1 C2/1 C3/1 C2/1 C3/1 C2/1 C3/1 C2/1 C3/1 C2/1 C3/1 C2/1 C3/1 D2/1 D3/1 D2/1 D3/1 D2/1 D3/1 D2/1 D3/1 C2/1 C3/1 C2/1 C3/1 C2/1 C3/1 C2/1 C3/1 Bb2/1 Bb3/1 Bb2/1 Bb3/1 Bb2/1 Bb3/1 Bb2/1 Bb3/1 A2/1 A3/1 A2/1 A3/1 A2/1 A3/1 A2/1 A3/1 D2/1 D3/1 D2/1 D3/1 D2/1 D3/1 D2/1 D3/1 F2/1 F3/1 F2/1 F3/1 F2/1 F3/1 F2/1 F3/1 G2/1 G3/1 G2/1 G3/1 G2/1 G3/1 G2/1 G3/1 Bb2/1 Bb3/1 Bb2/1 Bb3/1 Bb2/1 Bb3/1 Bb2/1 Bb3/1 G2/1 G3/1 G2/1 G3/1 G2/1 G3/1 G2/1 G3/1 A2/1 A3/1 A2/1 A3/1 A2/1 A3/1 A2/1 A3/1 D2/1 D3/1 D2/1 D3/1 D2/1 D3/1 D2/1 D3/1 D2/1 D3/1 D2/1 D3/1 D2/1 D3/1 D2/1 D3/1 F2/1 F3/1 F2/1 F3/1 F2/1 F3/1 F2/1 F3/1 F2/1 F3/1 F2/1 F3/1 F2/1 F3/1 F2/1 F3/1 C2/1 C3/1 C2/1 C3/1 C2/1 C3/1 C2/1 C3/1 C2/1 C3/1 C2/1 C3/1 C2/1 C3/1 C2/1 C3/1 Bb2/1 Bb3/1 Bb2/1 Bb3/1 Bb2/1 Bb3/1 Bb2/1 Bb3/1 Bb2/1 Bb3/1 Bb2/1 Bb3/1 Bb2/1 Bb3/1 Bb2/1 Bb3/1 A2/1 A3/1 A2/1 A3/1 A2/1 A3/1 A2/1 A3/1 A2/1 A3/1 A2/1 A3/1 A2/1 A3/1 A2/1 A3/1', harm: 'D4/1 F4/1 A4/1 F4/1 D4/1 F4/1 A4/1 F4/1 D4/1 F4/1 A4/1 F4/1 D4/1 F4/1 A4/1 F4/1 Bb4/1 D4/1 F4/1 D4/1 Bb4/1 D4/1 F4/1 D4/1 C4/1 E4/1 G4/1 E4/1 C4/1 E4/1 G4/1 E4/1 D4/1 F4/1 A4/1 F4/1 D4/1 F4/1 A4/1 F4/1 D4/1 F4/1 A4/1 F4/1 D4/1 F4/1 A4/1 F4/1 Bb4/1 D4/1 F4/1 D4/1 Bb4/1 D4/1 F4/1 D4/1 A4/1 C#4/1 E4/1 C#4/1 A4/1 C#4/1 E4/1 C#4/1 D4/1 F4/1 A4/1 F4/1 D4/1 F4/1 A4/1 F4/1 D4/1 F4/1 A4/1 F4/1 D4/1 F4/1 A4/1 F4/1 C4/1 E4/1 G4/1 E4/1 C4/1 E4/1 G4/1 E4/1 C4/1 E4/1 G4/1 E4/1 C4/1 E4/1 G4/1 E4/1 D4/1 F4/1 A4/1 F4/1 D4/1 F4/1 A4/1 F4/1 C4/1 E4/1 G4/1 E4/1 C4/1 E4/1 G4/1 E4/1 Bb4/1 D4/1 F4/1 D4/1 Bb4/1 D4/1 F4/1 D4/1 A4/1 C#4/1 E4/1 C#4/1 A4/1 C#4/1 E4/1 C#4/1 D4/1 F4/1 A4/1 F4/1 D4/1 F4/1 A4/1 F4/1 F4/1 A4/1 C4/1 A4/1 F4/1 A4/1 C4/1 A4/1 G4/1 Bb4/1 D4/1 Bb4/1 G4/1 Bb4/1 D4/1 Bb4/1 Bb4/1 D4/1 F4/1 D4/1 Bb4/1 D4/1 F4/1 D4/1 G4/1 Bb4/1 D4/1 Bb4/1 G4/1 Bb4/1 D4/1 Bb4/1 A4/1 C#4/1 E4/1 C#4/1 A4/1 C#4/1 E4/1 C#4/1 D4/1 F4/1 A4/1 F4/1 D4/1 F4/1 A4/1 F4/1 D4/1 F4/1 A4/1 F4/1 D4/1 F4/1 A4/1 F4/1 F4/1 A4/1 C4/1 A4/1 F4/1 A4/1 C4/1 A4/1 F4/1 A4/1 C4/1 A4/1 F4/1 A4/1 C4/1 A4/1 C4/1 E4/1 G4/1 E4/1 C4/1 E4/1 G4/1 E4/1 C4/1 E4/1 G4/1 E4/1 C4/1 E4/1 G4/1 E4/1 Bb4/1 D4/1 F4/1 D4/1 Bb4/1 D4/1 F4/1 D4/1 Bb4/1 D4/1 F4/1 D4/1 Bb4/1 D4/1 F4/1 D4/1 A4/1 C#4/1 E4/1 C#4/1 A4/1 C#4/1 E4/1 C#4/1 A4/1 C#4/1 E4/1 C#4/1 A4/1 C#4/1 E4/1 C#4/1', drum: 'k/1 h/1 s/1 h/1 k/1 k/1 s/1 h/1 k/1 h/1 s/1 h/1 k/1 k/1 s/1 h/1 k/1 h/1 s/1 h/1 k/1 k/1 s/1 h/1 k/1 h/1 s/1 h/1 k/1 k/1 s/1 h/1 k/1 h/1 s/1 h/1 k/1 k/1 s/1 h/1 k/1 h/1 s/1 h/1 k/1 k/1 s/1 h/1 k/1 h/1 s/1 h/1 k/1 k/1 s/1 h/1 k/1 h/1 s/1 h/1 k/1 k/1 s/1 h/1 k/1 h/1 s/1 h/1 k/1 k/1 s/1 h/1 k/1 h/1 s/1 h/1 k/1 k/1 s/1 h/1 k/1 h/1 s/1 h/1 k/1 k/1 s/1 h/1 k/1 h/1 s/1 h/1 k/1 k/1 s/1 h/1 k/1 h/1 s/1 h/1 k/1 k/1 s/1 h/1 k/1 h/1 s/1 h/1 k/1 k/1 s/1 h/1 k/1 h/1 s/1 h/1 k/1 k/1 s/1 h/1 k/1 h/1 s/1 h/1 k/1 k/1 s/1 h/1 k/1 h/1 s/1 h/1 k/1 k/1 s/1 h/1 k/1 h/1 s/1 h/1 k/1 k/1 s/1 h/1 k/1 h/1 s/1 h/1 k/1 k/1 s/1 h/1 k/1 h/1 s/1 h/1 k/1 k/1 s/1 h/1 k/1 h/1 s/1 h/1 k/1 k/1 s/1 h/1 k/1 h/1 s/1 h/1 k/1 k/1 s/1 h/1 k/1 h/1 s/1 h/1 k/1 k/1 s/1 h/1 k/1 h/1 s/1 h/1 k/1 k/1 s/1 h/1 k/1 h/1 s/1 h/1 k/1 k/1 s/1 h/1 k/1 h/1 s/1 h/1 k/1 k/1 s/1 h/1 k/1 h/1 s/1 h/1 k/1 k/1 s/1 h/1 k/1 h/1 s/1 h/1 k/1 k/1 s/1 h/1 k/1 h/1 s/1 h/1 k/1 k/1 s/1 h/1 k/1 h/1 s/1 h/1 k/1 k/1 s/1 h/1 k/1 h/1 s/1 h/1 k/1 k/1 s/1 h/1 k/1 h/1 s/1 h/1 k/1 k/1 s/1 h/1' };
