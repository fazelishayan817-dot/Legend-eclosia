'use strict';
/* ============================================================
   ÉCLOSIA — orchestre façon cartouche 32 bits
   cuivres, cordes, timbales, caisse claire, glockenspiel
   grain légèrement métallique, son sec, stéréo étroite
   ============================================================ */
const ORCH = { bus: null, play: null };
function orchBus() {
  if (ORCH.bus || !SND.ctx) return ORCH.bus;
  const c = SND.ctx;
  // grain : quantification douce + filtre passe-bas (rendu d'échantillons compressés)
  const crush = c.createWaveShaper(); const n = 4096, curve = new Float32Array(n), steps = 48;
  for (let i = 0; i < n; i++) { const x = i / (n - 1) * 2 - 1; curve[i] = Math.round(x * steps) / steps * 0.7 + x * 0.3; }
  crush.curve = curve;
  const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 9000; lp.Q.value = 0.4;
  const hp = c.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 45;
  const comp = c.createDynamicsCompressor(); comp.threshold.value = -16; comp.ratio.value = 3;
  const g = c.createGain(); g.gain.value = 0.9;
  g.connect(crush); crush.connect(lp); lp.connect(hp); hp.connect(comp); comp.connect(SND.musicGain);
  ORCH.bus = g; return g;
}
function nf(n) { return noteFreq(n); }
function voiceOut(dest, pan) { const c = SND.ctx; if (c.createStereoPanner) { const p = c.createStereoPanner(); p.pan.value = pan || 0; p.connect(dest); return p; } return dest; }
const INST = {
  brass(dest, f, t, d, v, pan) {
    const c = SND.ctx, out = voiceOut(dest, pan), g = c.createGain(), flt = c.createBiquadFilter();
    flt.type = 'lowpass'; flt.Q.value = 2; flt.frequency.setValueAtTime(700, t); flt.frequency.linearRampToValueAtTime(2800, t + 0.07); flt.frequency.linearRampToValueAtTime(1700, t + 0.3);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + 0.04); g.gain.setValueAtTime(v * 0.85, t + Math.max(0.05, d - 0.08)); g.gain.linearRampToValueAtTime(0, t + d + 0.06);
    for (const det of [-7, 6]) { const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f; o.detune.value = det;
      if (d > 0.4) { const l = c.createOscillator(), lg = c.createGain(); l.frequency.value = 5.4; lg.gain.setValueAtTime(0, t); lg.gain.linearRampToValueAtTime(7, t + 0.35); l.connect(lg); lg.connect(o.detune); l.start(t); l.stop(t + d + 0.1); }
      o.connect(flt); o.start(t); o.stop(t + d + 0.1); }
    flt.connect(g); g.connect(out);
  },
  horn(dest, f, t, d, v, pan) {
    const c = SND.ctx, out = voiceOut(dest, pan), g = c.createGain(), flt = c.createBiquadFilter();
    flt.type = 'lowpass'; flt.frequency.setValueAtTime(400, t); flt.frequency.linearRampToValueAtTime(1300, t + 0.12);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + 0.09); g.gain.setValueAtTime(v, t + Math.max(0.1, d - 0.1)); g.gain.linearRampToValueAtTime(0, t + d + 0.1);
    for (const [ty, det] of [['sawtooth', -4], ['square', 5]]) { const o = c.createOscillator(); o.type = ty; o.frequency.value = f; o.detune.value = det; o.connect(flt); o.start(t); o.stop(t + d + 0.15); }
    flt.connect(g); g.connect(out);
  },
  strings(dest, f, t, d, v, pan) {
    const c = SND.ctx, out = voiceOut(dest, pan), g = c.createGain(), flt = c.createBiquadFilter();
    flt.type = 'lowpass'; flt.frequency.value = 2300; flt.Q.value = 0.6;
    const atk = Math.min(0.25, d * 0.4);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + atk); g.gain.setValueAtTime(v, t + Math.max(atk, d - 0.05)); g.gain.linearRampToValueAtTime(0, t + d + 0.25);
    for (const det of [-11, 0, 9]) { const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f; o.detune.value = det; o.connect(flt); o.start(t); o.stop(t + d + 0.3); }
    flt.connect(g); g.connect(out);
  },
  stab(dest, f, t, d, v, pan) { INST.strings(dest, f, t, Math.min(d, 0.14), v * 1.2, pan); },
  bass(dest, f, t, d, v, pan) {
    const c = SND.ctx, out = voiceOut(dest, pan), g = c.createGain(), flt = c.createBiquadFilter();
    flt.type = 'lowpass'; flt.frequency.value = 650;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + 0.01); g.gain.exponentialRampToValueAtTime(v * 0.55, t + Math.max(0.05, d * 0.8)); g.gain.linearRampToValueAtTime(0, t + d + 0.03);
    for (const ty of ['triangle', 'square']) { const o = c.createOscillator(); o.type = ty; o.frequency.value = f; o.connect(flt); o.start(t); o.stop(t + d + 0.05); }
    flt.connect(g); g.connect(out);
  },
  glock(dest, f, t, d, v, pan) {
    const c = SND.ctx, out = voiceOut(dest, pan);
    for (const [m, a, dec] of [[2, 1, 0.9], [5.4, 0.35, 0.25], [8.9, 0.15, 0.12]]) { const o = c.createOscillator(), g = c.createGain(); o.type = 'sine'; o.frequency.value = f * m; g.gain.setValueAtTime(v * a, t); g.gain.exponentialRampToValueAtTime(0.0008, t + dec); o.connect(g); g.connect(out); o.start(t); o.stop(t + dec + 0.05); }
  },
  timp(dest, f, t, d, v, pan) {
    const c = SND.ctx, out = voiceOut(dest, pan), o = c.createOscillator(), g = c.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(f * 1.25, t); o.frequency.exponentialRampToValueAtTime(f, t + 0.06);
    g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.9); o.connect(g); g.connect(out); o.start(t); o.stop(t + 1);
    const o2 = c.createOscillator(), g2 = c.createGain(); o2.type = 'triangle'; o2.frequency.value = f * 1.5; g2.gain.setValueAtTime(v * 0.25, t); g2.gain.exponentialRampToValueAtTime(0.001, t + 0.3); o2.connect(g2); g2.connect(out); o2.start(t); o2.stop(t + 0.35);
    orchNoise(out, t, 0.08, v * 0.5, 'lowpass', 400);
  },
  snare(dest, f, t, d, v, pan) { const out = voiceOut(dest, pan); orchNoise(out, t, 0.14, v, 'bandpass', 1900); const c = SND.ctx, o = c.createOscillator(), g = c.createGain(); o.type = 'triangle'; o.frequency.setValueAtTime(220, t); o.frequency.exponentialRampToValueAtTime(140, t + 0.05); g.gain.setValueAtTime(v * 0.5, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.08); o.connect(g); g.connect(out); o.start(t); o.stop(t + 0.1); },
  roll(dest, f, t, d, v, pan) { const n = Math.max(2, Math.floor(d / 0.055)); for (let i = 0; i < n; i++) INST.snare(dest, 0, t + i * d / n, 0, v * (0.35 + 0.65 * i / n), pan); },
  kick(dest, f, t, d, v, pan) { const c = SND.ctx, out = voiceOut(dest, pan), o = c.createOscillator(), g = c.createGain(); o.type = 'sine'; o.frequency.setValueAtTime(110, t); o.frequency.exponentialRampToValueAtTime(42, t + 0.12); g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.25); o.connect(g); g.connect(out); o.start(t); o.stop(t + 0.3); },
  crash(dest, f, t, d, v, pan) { orchNoise(voiceOut(dest, pan), t, 1.6, v, 'highpass', 4500); },
  hat(dest, f, t, d, v, pan) { orchNoise(voiceOut(dest, pan), t, 0.04, v, 'highpass', 8000); },
};
function orchNoise(out, t, dur, vol, type, freq) {
  const c = SND.ctx;
  if (!NOISE) { NOISE = c.createBuffer(1, c.sampleRate * 0.5, c.sampleRate); const dd = NOISE.getChannelData(0); for (let i = 0; i < dd.length; i++) dd[i] = Math.random() * 2 - 1; }
  const s = c.createBufferSource(); s.buffer = NOISE; s.loop = dur > 0.45;
  const f = c.createBiquadFilter(); f.type = type; f.frequency.value = freq;
  const g = c.createGain(); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  s.connect(f); f.connect(g); g.connect(out); s.start(t); s.stop(t + dur + 0.02);
}
/* Partition : "Note/temps" séparés par des espaces ; accords avec "+" ; "-" = silence ; temps en noires */
function parseLine(s) { return s.trim().split(/\s+/).map(tok => { const [n, d] = tok.split('/'); return [n, parseFloat(d || '1')]; }); }
function sectionLen(sec) { return sec.beats * 60 / sec.bpm; }
function scheduleSection(dest, sec, t0) {
  const spb = 60 / sec.bpm;
  for (const tr of sec.tracks) {
    let t = t0;
    for (const [n, d] of parseLine(tr.n)) {
      const dur = d * spb;
      if (n !== '-') for (const nn of n.split('+')) {
        const f = /^[A-G]/.test(nn) ? nf(nn) : 0;
        INST[tr.i](dest, f, t, dur * (tr.legato || 0.95), tr.v, tr.p || 0);
      }
      t += dur;
    }
  }
  return t0 + sectionLen(sec);
}
function playScore(name) {
  const sc = SCORES[name]; if (!sc || !SND.ctx) return;
  stopMusic();
  const c = SND.ctx, bus = orchBus(), g = c.createGain(); g.gain.value = 1; g.connect(bus);
  const P = { name, g, timers: [], start: c.currentTime + 0.1 };
  ORCH.play = P; SND.cur = { name, orch: true };
  let t = P.start;
  for (const s of sc.once || []) t = scheduleSection(g, s, t);
  const loop = sc.loop || [];
  const next = tt => {
    if (ORCH.play !== P || !loop.length) return;
    let e = tt; for (const s of loop) e = scheduleSection(g, s, e);
    P.timers.push(setTimeout(() => next(e), Math.max(0, (e - c.currentTime - 2.5) * 1000)));
  };
  if (loop.length) P.timers.push(setTimeout(() => next(t), Math.max(0, (t - c.currentTime - 2.5) * 1000)));
}
function stopScore() {
  const P = ORCH.play; if (!P) return;
  ORCH.play = null; P.timers.forEach(clearTimeout);
  try { const c = SND.ctx; P.g.gain.cancelScheduledValues(c.currentTime); P.g.gain.setValueAtTime(P.g.gain.value, c.currentTime); P.g.gain.linearRampToValueAtTime(0, c.currentTime + 0.4); setTimeout(() => { try { P.g.disconnect(); } catch (e) { } }, 600); } catch (e) { }
}

/* ---------- Compositions originales ---------- */
// Partie 1 — Aventure : do majeur, rapide, lumineux
const SEC1 = { bpm: 152, beats: 32, tracks: [
  { i: 'brass', v: 0.075, p: 0.1, n: 'G4/.5 C5/.5 E5/1 D5/.5 C5/.5 D5/1 B4/1.5 G4/.5 D5/1 G5/1 E5/1 C5/.5 A4/.5 C5/1 E5/1 F5/1.5 E5/.5 D5/1 C5/1 G4/.5 C5/.5 E5/1 G5/1 E5/1 D5/1.5 B4/.5 G4/1 D5/1 C5/1 A4/1 F5/1 E5/.5 D5/.5 D5/2 G5/1 -/1' },
  { i: 'horn', v: 0.045, p: -0.15, n: 'E4/2 G4/2 D4/2 G4/2 C4/2 E4/2 A4/2 F4/2 E4/2 G4/2 D4/2 B3/2 A3/2 C4/2 B3/2 D4/2' },
  { i: 'strings', v: 0.026, p: -0.2, n: 'C4+E4+G4/4 B3+D4+G4/4 A3+C4+E4/4 F3+A3+C4/4 C4+E4+G4/4 B3+D4+G4/4 A3+C4+F4/4 B3+D4+G4/4' },
  { i: 'bass', v: 0.12, n: 'C2/.5 C3/.5 G2/.5 C3/.5 C2/.5 C3/.5 G2/.5 C3/.5 B1/.5 B2/.5 G2/.5 B2/.5 B1/.5 B2/.5 G2/.5 B2/.5 A1/.5 A2/.5 E2/.5 A2/.5 A1/.5 A2/.5 E2/.5 A2/.5 F1/.5 F2/.5 C2/.5 F2/.5 F1/.5 F2/.5 C2/.5 F2/.5 C2/.5 C3/.5 G2/.5 C3/.5 C2/.5 C3/.5 G2/.5 C3/.5 G1/.5 G2/.5 D2/.5 G2/.5 G1/.5 G2/.5 D2/.5 G2/.5 F1/.5 F2/.5 C2/.5 F2/.5 F1/.5 F2/.5 C2/.5 F2/.5 G1/.5 G2/.5 D2/.5 G2/.5 G1/1 G2/1' },
  { i: 'snare', v: 0.12, n: '-/1 x/1 -/1 x/1 -/1 x/1 -/1 x/.5 x/.5 -/1 x/1 -/1 x/1 -/1 x/1 -/1 x/1 -/1 x/1 -/1 x/1 -/1 x/1 -/1 x/.5 x/.5 -/1 x/1 -/1 x/1 -/1 x/1 -/1 x/1' },
  { i: 'kick', v: 0.2, n: 'x/1 -/1 x/1 -/1 x/1 -/1 x/1 -/1 x/1 -/1 x/1 -/1 x/1 -/1 x/1 -/1 x/1 -/1 x/1 -/1 x/1 -/1 x/1 -/1 x/1 -/1 x/1 -/1 x/1 -/1 x/1 x/1' },
  { i: 'hat', v: 0.03, p: 0.25, n: 'x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5' },
  { i: 'glock', v: 0.03, p: 0.3, n: '-/28 G5/.5 B5/.5 D6/.5 G6/.5' },
  { i: 'crash', v: 0.06, n: 'x/32' },
] };
// Partie 2 — Affrontement : ré mineur, martelé, orageux
const SEC2 = { bpm: 138, beats: 32, tracks: [
  { i: 'horn', v: 0.07, p: -0.1, n: 'D3/3 C3/1 D3/2 F3/2 Bb2/3 C3/1 C3/2 E3/2 D3/3 E3/1 F3/2 D3/2 G3/2 Bb3/2 A3/2 C#4/2' },
  { i: 'brass', v: 0.05, p: 0.15, n: '-/2 D4/.5 D4/.5 A4/1 -/2 F4/.5 F4/.5 D5/1 -/2 Bb4/.5 Bb4/.5 F4/1 -/2 C5/.5 C5/.5 G4/1 -/2 D4/.5 D4/.5 A4/1 -/2 F4/.5 F4/.5 Bb4/1 -/2 G4/.5 Bb4/.5 D5/1 -/1 A4/.5 C#5/.5 E5/1 A5/1' },
  { i: 'stab', v: 0.03, p: -0.25, n: 'D4/.25 F4/.25 A4/.25 F4/.25 D4/.25 F4/.25 A4/.25 F4/.25 D4/.25 F4/.25 A4/.25 F4/.25 D4/.25 F4/.25 A4/.25 F4/.25 D4/.25 F4/.25 A4/.25 F4/.25 D4/.25 F4/.25 A4/.25 F4/.25 D4/.25 F4/.25 A4/.25 F4/.25 D4/.25 F4/.25 A4/.25 F4/.25 Bb3/.25 D4/.25 F4/.25 D4/.25 Bb3/.25 D4/.25 F4/.25 D4/.25 Bb3/.25 D4/.25 F4/.25 D4/.25 Bb3/.25 D4/.25 F4/.25 D4/.25 C4/.25 E4/.25 G4/.25 E4/.25 C4/.25 E4/.25 G4/.25 E4/.25 C4/.25 E4/.25 G4/.25 E4/.25 C4/.25 E4/.25 G4/.25 E4/.25 D4/.25 F4/.25 A4/.25 F4/.25 D4/.25 F4/.25 A4/.25 F4/.25 D4/.25 F4/.25 A4/.25 F4/.25 D4/.25 F4/.25 A4/.25 F4/.25 Bb3/.25 D4/.25 F4/.25 D4/.25 Bb3/.25 D4/.25 F4/.25 D4/.25 Bb3/.25 D4/.25 F4/.25 D4/.25 Bb3/.25 D4/.25 F4/.25 D4/.25 G3/.25 Bb3/.25 D4/.25 Bb3/.25 G3/.25 Bb3/.25 D4/.25 Bb3/.25 G3/.25 Bb3/.25 D4/.25 Bb3/.25 G3/.25 Bb3/.25 D4/.25 Bb3/.25 A3/.25 C#4/.25 E4/.25 C#4/.25 A3/.25 C#4/.25 E4/.25 C#4/.25 A3/.25 C#4/.25 E4/.25 C#4/.25 A3/.25 C#4/.25 E4/.25 C#4/.25' },
  { i: 'strings', v: 0.022, p: 0.2, n: 'D3+A3/8 Bb2+F3/4 C3+G3/4 D3+A3/8 G2+D3/4 A2+E3/4' },
  { i: 'bass', v: 0.13, n: 'D2/.5 D2/.5 D2/.5 D2/.5 D2/.5 D2/.5 D2/.5 D2/.5 D2/.5 D2/.5 D2/.5 D2/.5 D2/.5 D2/.5 D2/.5 D2/.5 Bb1/.5 Bb1/.5 Bb1/.5 Bb1/.5 Bb1/.5 Bb1/.5 Bb1/.5 Bb1/.5 C2/.5 C2/.5 C2/.5 C2/.5 C2/.5 C2/.5 C2/.5 C2/.5 D2/.5 D2/.5 D2/.5 D2/.5 D2/.5 D2/.5 D2/.5 D2/.5 Bb1/.5 Bb1/.5 Bb1/.5 Bb1/.5 Bb1/.5 Bb1/.5 Bb1/.5 Bb1/.5 G1/.5 G1/.5 G1/.5 G1/.5 G1/.5 G1/.5 G1/.5 G1/.5 A1/.5 A1/.5 A1/.5 A1/.5 A1/.5 A1/.5 A1/.5 A1/.5' },
  { i: 'timp', v: 0.22, n: 'D2/1 D2/1 D2/.5 D2/.5 A1/1 D2/1 D2/1 D2/.5 D2/.5 A1/1 Bb1/1 Bb1/1 Bb1/.5 Bb1/.5 F1/1 C2/1 C2/1 C2/.5 C2/.5 G1/1 D2/1 D2/1 D2/.5 D2/.5 A1/1 Bb1/1 Bb1/1 Bb1/.5 Bb1/.5 F1/1 G1/1 G1/1 G1/.5 G1/.5 D2/1 A1/.5 A1/.5 A1/.5 A1/.5 A1/.25 A1/.25 A1/.25 A1/.25 A1/.5 A1/.5' },
  { i: 'snare', v: 0.13, n: '-/1 x/1 -/1 x/.5 x/.5 -/1 x/1 -/1 x/1 -/1 x/1 -/1 x/.5 x/.5 -/1 x/1 -/1 x/1 -/1 x/1 -/1 x/.5 x/.5 -/1 x/1 -/1 x/1' },
  { i: 'roll', v: 0.1, n: '-/28 x/4' },
  { i: 'crash', v: 0.07, n: 'x/16 x/16' },
] };
// Partie 3 — Intervention céleste : tension, puis ré majeur triomphant
const SEC3 = { bpm: 96, beats: 28, tracks: [
  { i: 'strings', v: 0.03, p: -0.15, n: 'Bb3+D4+F4/2 C4+E4+G4/2 D4+F4+A4/2 E4+G4+Bb4/2 A3+C#4+E4+G4/4 D4+F#4+A4/4 G3+B3+D4+G4/4 A3+C#4+E4/4 D4+F#4+A4+D5/4' },
  { i: 'brass', v: 0.08, p: 0.1, n: '-/8 D5/2 F#5/1 A5/1 B5/2 A5/2 G5/1 F#5/1 E5/1 D5/1 E5/2 A5/2 D6/4' },
  { i: 'horn', v: 0.055, p: -0.1, n: 'Bb3/2 C4/2 D4/2 E4/2 A3/4 F#4/2 A4/2 G4/4 E4/2 C#4/2 D4/4' },
  { i: 'bass', v: 0.11, n: 'Bb1/2 C2/2 D2/2 E2/2 A1/4 D2/2 D2/2 G1/2 G1/2 A1/2 A1/2 D2/4' },
  { i: 'roll', v: 0.12, n: '-/4 x/4' },
  { i: 'timp', v: 0.25, n: 'Bb1/2 C2/2 D2/1 D2/1 E2/1 E2/1 A1/.5 A1/.5 A1/.5 A1/.5 A1/.25 A1/.25 A1/.25 A1/.25 A1/.25 A1/.25 A1/.25 A1/.25 D2/4 G1/2 G1/2 A1/2 A1/2 D2/4' },
  { i: 'crash', v: 0.08, n: '-/8 x/8 -/4 x/4' },
  { i: 'glock', v: 0.035, p: 0.3, n: '-/8 A5/.5 D6/.5 F#6/.5 A6/.5 -/2 G5/.5 B5/.5 D6/.5 G6/.5 -/2 E6/.5 C#6/.5 A5/.5 E6/.5 -/2 D6/1 F#6/1 A6/2' },
] };
// Partie 4 — Écran titre : si bémol majeur, solennel, en boucle
const SEC4A = { bpm: 84, beats: 16, tracks: [
  { i: 'strings', v: 0.032, p: -0.15, n: 'Bb2+F3+Bb3+D4+F4/8 G3+Bb3+D4/4 Eb3+G3+Bb3/2 F3+A3+C4+Eb4/2' },
  { i: 'horn', v: 0.06, p: -0.1, n: 'Bb3/8 G3/2 A3/2 Bb3/2 C4/2' },
  { i: 'brass', v: 0.065, p: 0.12, n: 'F4/4 D5/4 -/4 C5/2 F5/2' },
  { i: 'bass', v: 0.12, n: 'Bb1/8 G1/4 Eb2/2 F2/2' },
  { i: 'timp', v: 0.28, n: 'Bb1/.25 Bb1/.25 Bb1/.25 Bb1/.25 Bb1/.25 Bb1/.25 Bb1/.25 Bb1/.25 Bb1/2 F1/2 Bb1/2 G1/2 G1/2 Eb1/2 F1/.5 F1/.5 F1/.5 F1/.5' },
  { i: 'crash', v: 0.09, n: 'x/16' },
  { i: 'roll', v: 0.11, n: '-/12 x/4' },
] };
const SEC4B = { bpm: 84, beats: 48, tracks: [
  { i: 'brass', v: 0.08, p: 0.1, n: 'F4/1 Bb4/1 D5/2 C5/1.5 Bb4/.5 A4/1 C5/1 D5/2 Bb4/1 G4/1 Eb5/3 D5/.5 C5/.5 D5/1 F5/1 Bb5/2 A5/1.5 G5/.5 F5/2 G5/1 F5/1 Eb5/1 C5/1 D5/4 Bb5/2 A5/1 G5/1 G5/1.5 F5/.5 Eb5/2 C5/1 D5/1 E5/1 F5/1 F5/4' },
  { i: 'horn', v: 0.05, p: -0.12, n: 'D4/4 C4/4 Bb3/4 G3/4 F4/4 C4/4 Bb3/2 C4/2 D4/4 D4/4 Bb3/4 G3/4 A3/4' },
  { i: 'strings', v: 0.03, p: -0.2, n: 'Bb2+F3+D4/4 A2+F3+C4/4 G2+D3+Bb3/4 Eb3+G3+Bb3/4 Bb2+F3+D4/4 F2+C3+A3/4 Eb3+G3+Bb3/2 F3+A3+C4/2 Bb2+F3+D4/4 G2+D3+Bb3/4 Eb3+G3+Bb3/4 C3+E3+G3/4 F3+A3+C4+Eb4/4' },
  { i: 'bass', v: 0.12, n: 'Bb1/2 Bb1/2 A1/2 A1/2 G1/2 G1/2 Eb2/2 Eb2/2 Bb1/2 Bb1/2 F1/2 F1/2 Eb2/2 F2/2 Bb1/2 Bb1/2 G1/2 G1/2 Eb2/2 Eb2/2 C2/2 C2/2 F1/2 F1/2' },
  { i: 'timp', v: 0.2, n: 'Bb1/2 F1/2 F1/2 C2/2 G1/2 D2/2 Eb2/2 Bb1/2 Bb1/2 F1/2 F1/2 C2/2 Eb2/2 F1/2 Bb1/2 F1/2 G1/2 D2/2 Eb2/2 Bb1/2 C2/2 G1/2 F1/1 F1/1 F1/.5 F1/.5 F1/.5 F1/.5' },
  { i: 'snare', v: 0.07, n: '-/44 x/.5 x/.5 x/.5 x/.5' },
  { i: 'roll', v: 0.09, n: '-/12 x/4 -/24 x/4 -/4' },
  { i: 'glock', v: 0.032, p: 0.3, n: '-/4 F6/1 D6/1 Bb5/2 -/4 G6/1 Eb6/1 Bb5/2 -/4 F6/1 C6/1 A5/2 -/4 D6/1 F6/1 Bb6/2 -/4 G6/1 Eb6/1 Bb5/2 -/4 F6/.5 G6/.5 A6/.5 C7/.5 F6/2' },
  { i: 'crash', v: 0.05, n: 'x/16 x/16 -/16' },
] };

// Partie 4 (suite) — Écran titre : rapide et effréné, sol mineur, le combat inachevé
const SEC4C = { bpm: 176, beats: 32, tracks: [
  { i: 'brass', v: 0.075, p: 0.1, n: 'G5/.5 G5/.5 F5/.5 G5/.5 Bb5/1 A5/1 G5/1 F5/.5 Eb5/.5 D5/2 C5/.5 D5/.5 Eb5/.5 F5/.5 G5/1 A5/1 F#5/2 D5/2 G5/.5 A5/.5 Bb5/1 D6/2 C6/1 Bb5/1 G5/2 A5/1 Bb5/1 C6/1 D6/1 D6/2 A5/1 F#5/1' },
  { i: 'horn', v: 0.05, p: -0.12, n: 'G3+D4/1 -/.5 G3+D4/.5 G3+D4/1 G3+D4/1 Eb3+Bb3/1 -/.5 Eb3+Bb3/.5 Eb3+Bb3/1 Eb3+Bb3/1 F3+C4/1 -/.5 F3+C4/.5 F3+C4/1 F3+C4/1 D3+A3/1 -/.5 D3+A3/.5 D3+A3/1 D3+A3/1 G3+D4/1 -/.5 G3+D4/.5 G3+D4/1 G3+D4/1 Eb3+Bb3/1 -/.5 Eb3+Bb3/.5 Eb3+Bb3/1 Eb3+Bb3/1 C3+G3/1 -/.5 C3+G3/.5 C3+G3/1 C3+G3/1 D3+A3/1 -/.5 D3+A3/.5 D3+A3/1 D3+A3/1' },
  { i: 'stab', v: 0.026, p: -0.25, n: 'G4/.25 Bb4/.25 D5/.25 Bb4/.25 G4/.25 Bb4/.25 D5/.25 Bb4/.25 G4/.25 Bb4/.25 D5/.25 Bb4/.25 G4/.25 Bb4/.25 D5/.25 Bb4/.25 Eb4/.25 G4/.25 Bb4/.25 G4/.25 Eb4/.25 G4/.25 Bb4/.25 G4/.25 Eb4/.25 G4/.25 Bb4/.25 G4/.25 Eb4/.25 G4/.25 Bb4/.25 G4/.25 F4/.25 A4/.25 C5/.25 A4/.25 F4/.25 A4/.25 C5/.25 A4/.25 F4/.25 A4/.25 C5/.25 A4/.25 F4/.25 A4/.25 C5/.25 A4/.25 D4/.25 F#4/.25 A4/.25 F#4/.25 D4/.25 F#4/.25 A4/.25 F#4/.25 D4/.25 F#4/.25 A4/.25 F#4/.25 D4/.25 F#4/.25 A4/.25 F#4/.25 G4/.25 Bb4/.25 D5/.25 Bb4/.25 G4/.25 Bb4/.25 D5/.25 Bb4/.25 G4/.25 Bb4/.25 D5/.25 Bb4/.25 G4/.25 Bb4/.25 D5/.25 Bb4/.25 Eb4/.25 G4/.25 Bb4/.25 G4/.25 Eb4/.25 G4/.25 Bb4/.25 G4/.25 Eb4/.25 G4/.25 Bb4/.25 G4/.25 Eb4/.25 G4/.25 Bb4/.25 G4/.25 C4/.25 Eb4/.25 G4/.25 Eb4/.25 C4/.25 Eb4/.25 G4/.25 Eb4/.25 C4/.25 Eb4/.25 G4/.25 Eb4/.25 C4/.25 Eb4/.25 G4/.25 Eb4/.25 D4/.25 F#4/.25 A4/.25 C5/.25 D4/.25 F#4/.25 A4/.25 C5/.25 D4/.25 F#4/.25 A4/.25 C5/.25 D4/.25 F#4/.25 A4/.25 C5/.25' },
  { i: 'bass', v: 0.12, n: 'G2/.5 G2/.5 G2/.5 G2/.5 G2/.5 G2/.5 G2/.5 G2/.5 Eb2/.5 Eb2/.5 Eb2/.5 Eb2/.5 Eb2/.5 Eb2/.5 Eb2/.5 Eb2/.5 F2/.5 F2/.5 F2/.5 F2/.5 F2/.5 F2/.5 F2/.5 F2/.5 D2/.5 D2/.5 D2/.5 D2/.5 D2/.5 D2/.5 D2/.5 D2/.5 G2/.5 G2/.5 G2/.5 G2/.5 G2/.5 G2/.5 G2/.5 G2/.5 Eb2/.5 Eb2/.5 Eb2/.5 Eb2/.5 Eb2/.5 Eb2/.5 Eb2/.5 Eb2/.5 C2/.5 C2/.5 C2/.5 C2/.5 C2/.5 C2/.5 C2/.5 C2/.5 D2/.5 D2/.5 D2/.5 D2/.5 D2/.5 D2/.5 D2/.5 D2/.5' },
  { i: 'timp', v: 0.22, n: 'G2/1 G2/.5 G2/.5 D1/1 G2/1 Eb2/1 Eb2/.5 Eb2/.5 Bb1/1 Eb2/1 F2/1 F2/.5 F2/.5 C1/1 F2/1 D2/1 D2/.5 D2/.5 A1/1 D2/1 G2/1 G2/.5 G2/.5 D1/1 G2/1 Eb2/1 Eb2/.5 Eb2/.5 Bb1/1 Eb2/1 C2/1 C2/.5 C2/.5 G1/1 C2/1 D2/1 D2/.5 D2/.5 A1/1 D2/1' },
  { i: 'snare', v: 0.1, n: 'x/.5 -/.5 x/.5 x/.5 -/.5 x/.5 x/.25 x/.25 x/.5 x/.5 -/.5 x/.5 x/.5 -/.5 x/.5 x/.25 x/.25 x/.5 x/.5 -/.5 x/.5 x/.5 -/.5 x/.5 x/.25 x/.25 x/.5 x/.5 -/.5 x/.5 x/.5 -/.5 x/.5 x/.25 x/.25 x/.5 x/.5 -/.5 x/.5 x/.5 -/.5 x/.5 x/.25 x/.25 x/.5 x/.5 -/.5 x/.5 x/.5 -/.5 x/.5 x/.25 x/.25 x/.5 x/.5 -/.5 x/.5 x/.5 -/.5 x/.5 x/.25 x/.25 x/.5 x/.5 -/.5 x/.5 x/.5 -/.5 x/.5 x/.25 x/.25 x/.5' },
  { i: 'kick', v: 0.18, n: 'x/1 x/1 x/1 x/1 x/1 x/1 x/1 x/1 x/1 x/1 x/1 x/1 x/1 x/1 x/1 x/1 x/1 x/1 x/1 x/1 x/1 x/1 x/1 x/1 x/1 x/1 x/1 x/1 x/1 x/1 x/1 x/1' },
  { i: 'hat', v: 0.025, p: 0.25, n: 'x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5 x/.5' },
  { i: 'roll', v: 0.1, n: '-/28 x/4' },
  { i: 'crash', v: 0.07, n: 'x/16 x/16' },
  { i: 'glock', v: 0.03, p: 0.3, n: '-/16 D6/.5 G6/.5 Bb6/.5 D7/.5 -/14' },
] };
const SCORES = {
  intro: { once: [SEC1, SEC2, SEC3, SEC4A], loop: [SEC4B, SEC4C] },
  titre: { once: [SEC4A], loop: [SEC4B, SEC4C] },
};
const INTRO_MARKS = (() => { let t = 0; return [SEC1, SEC2, SEC3, SEC4A].map(s => (t += sectionLen(s))); })();
