'use strict';
/* Mode console : plein écran, orientation paysage, disposition à manettes latérales */
async function toggleFullscreen() {
  const d = document.documentElement, btn = document.querySelector('[data-act="fs"]');
  try {
    if (!(document.fullscreenElement || document.webkitFullscreenElement)) {
      const req = d.requestFullscreen || d.webkitRequestFullscreen;
      if (!req) throw new Error('no-fs');
      await req.call(d, { navigationUI: 'hide' });
      try { await screen.orientation.lock('landscape'); } catch (e) { }
    } else {
      try { screen.orientation.unlock(); } catch (e) { }
      await (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    }
  } catch (e) {
    if (btn) { const t = btn.textContent; btn.textContent = 'TOURNE TON TÉLÉPHONE'; setTimeout(() => { btn.textContent = t; }, 2200); }
  }
}
(function () {
  const init = () => {
    const mid = document.querySelector('#pad .mid');
    if (mid && !mid.querySelector('[data-act="fs"]')) {
      const b = document.createElement('button'); b.className = 'btn small fs'; b.type = 'button'; b.dataset.act = 'fs'; b.textContent = 'PLEIN ÉCRAN';
      b.addEventListener('click', toggleFullscreen); mid.appendChild(b);
    }
    window.addEventListener('keydown', e => { if ((e.key === 'f' || e.key === 'F') && !(document.activeElement && document.activeElement.tagName === 'INPUT')) toggleFullscreen(); });
    const help = document.getElementById('help');
    if (help && !help.querySelector('.fsk')) help.insertAdjacentHTML('beforeend', ' · <span class="fsk">Plein écran <kbd>F</kbd></span>');
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
