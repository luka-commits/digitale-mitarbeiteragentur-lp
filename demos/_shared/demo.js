/* ============================================================
   DMA Demo · Shared State-Machine
   - Autoplay default (states laufen sequenziell durch)
   - ?manual=1 → klickbarer Stepper, Pfeiltasten, Spacebar pause
   - Demo registriert sich via window.DemoConfig (siehe persona/index.html)
   ============================================================ */

(function () {
  'use strict';

  const params = new URLSearchParams(window.location.search);
  const isManual = params.get('manual') === '1';
  const debug = params.get('debug') === '1';

  // Auto-Embed-Mode: wenn die Demo in einem Iframe läuft, kompakteres Layout aktivieren.
  // ?embed=1 erzwingt manuell, ?embed=0 deaktiviert.
  const embedQ = params.get('embed');
  const isEmbed = embedQ === '1' || (embedQ !== '0' && (function () {
    try { return window.self !== window.top; } catch (e) { return true; }
  })());
  if (isEmbed) document.documentElement.classList.add('is-embed');

  function log(...args) { if (debug) console.log('[demo]', ...args); }

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    const cfg = window.DemoConfig || {};
    const states = Array.from(document.querySelectorAll('[data-state]'));
    const total = states.length;
    if (!total) return;

    const stepIndicator = document.querySelector('[data-step-indicator]');
    const progressBar = document.querySelector('[data-autoplay-progress]');
    const cockpitBar = document.querySelector('.demo-cockpit-bar');

    let current = 0;
    let timer = null;
    let progressTimer = null;
    let progressStart = 0;
    let progressDur = 0;
    let isPaused = false;

    // Default-Dauern pro State (ms). Persona kann via DemoConfig.durations überschreiben.
    const defaultDurations = [8000, 22000, 18000, 7000, 12000];
    const durations = (cfg.durations && cfg.durations.length === total)
      ? cfg.durations
      : defaultDurations.slice(0, total);

    log('init', { total, durations, isManual });

    function setStep(idx, opts) {
      opts = opts || {};
      if (idx < 0) idx = 0;
      if (idx >= total) {
        // Loop am Ende
        idx = 0;
      }
      current = idx;
      states.forEach((s, i) => s.classList.toggle('is-active', i === idx));

      if (stepIndicator) {
        stepIndicator.innerHTML = `Schritt <b>${idx + 1}</b> · von ${total}`;
      }

      // Manual-Mode: Pills aktualisieren
      document.querySelectorAll('.demo-controls .step-pill').forEach((p, i) => {
        p.classList.toggle('is-active', i === idx);
      });

      // Lifecycle-Hook: per-state setup (Reasoning-Steps, Typing, Confidence-Bar)
      const hook = cfg.onState && cfg.onState[idx];
      if (typeof hook === 'function') {
        try { hook(states[idx]); }
        catch (e) { console.error('state hook failed', idx, e); }
      }

      if (!opts.silent) advanceProgress();
    }

    function advanceProgress() {
      if (isManual || isPaused) return;
      clearTimeout(timer);
      progressStart = performance.now();
      progressDur = durations[current];
      tickProgress();
      timer = setTimeout(() => setStep(current + 1), progressDur);
    }

    function tickProgress() {
      if (!progressBar) return;
      cancelAnimationFrame(progressTimer);
      function step() {
        const elapsed = performance.now() - progressStart;
        const pct = Math.min(100, (elapsed / progressDur) * 100);
        progressBar.style.width = pct + '%';
        if (pct < 100 && !isPaused) progressTimer = requestAnimationFrame(step);
      }
      step();
    }

    function next() { setStep(current + 1); }
    function prev() { setStep(current - 1); }
    function go(i) { setStep(i); }

    function pause() {
      if (isPaused) return;
      isPaused = true;
      clearTimeout(timer);
      cancelAnimationFrame(progressTimer);
      log('paused');
    }

    function resume() {
      if (!isPaused) return;
      isPaused = false;
      log('resumed');
      advanceProgress();
    }

    function togglePause() { isPaused ? resume() : pause(); }

    // ── Manual-Mode UI ─────────────────────────────────────────
    if (isManual) {
      if (cockpitBar) cockpitBar.classList.add('is-manual');
      const ctrl = document.createElement('div');
      ctrl.className = 'demo-controls is-visible';
      ctrl.innerHTML = `
        <button data-act="prev" aria-label="Zurück">←</button>
        <div class="step-pills">
          ${states.map((_, i) => `<button class="step-pill" data-go="${i}">${i + 1}</button>`).join('')}
        </div>
        <button data-act="next" aria-label="Weiter">→</button>
        <button data-act="restart" aria-label="Neustart">↻</button>
      `;
      document.body.appendChild(ctrl);

      ctrl.querySelector('[data-act="prev"]').addEventListener('click', prev);
      ctrl.querySelector('[data-act="next"]').addEventListener('click', next);
      ctrl.querySelector('[data-act="restart"]').addEventListener('click', () => {
        // Re-mount: clear any per-state state, run lifecycle again
        setStep(0);
      });
      ctrl.querySelectorAll('[data-go]').forEach(btn => {
        btn.addEventListener('click', () => go(parseInt(btn.dataset.go, 10)));
      });
    }

    // ── Keyboard ───────────────────────────────────────────────
    document.addEventListener('keydown', e => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
      else if (e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); togglePause(); }
      else if (e.key === 'r' || e.key === 'R') setStep(0);
      else if (/^[1-9]$/.test(e.key)) {
        const i = parseInt(e.key, 10) - 1;
        if (i < total) go(i);
      }
    });

    // ── Start ──────────────────────────────────────────────────
    setStep(0);
  });

  // ============================================================
  // Helpers — nutzbar in persona/index.html via window.DemoHelpers
  // ============================================================
  window.DemoHelpers = {
    /**
     * Reasoning-Steps animieren: aktiviert .is-active, dann .is-done auf jedem Step.
     * @param {HTMLElement} root - container mit .reasoning-step children
     * @param {object} opts - { activeMs, doneMs, gapMs }
     */
    animateReasoningSteps(root, opts = {}) {
      const steps = Array.from(root.querySelectorAll('.reasoning-step'));
      const activeMs = opts.activeMs || 1400;
      const gapMs = opts.gapMs || 350;
      let cumulative = 0;

      steps.forEach((step, i) => {
        // visible
        setTimeout(() => step.classList.add('is-visible'), cumulative);
        cumulative += 220;
        // active
        setTimeout(() => step.classList.add('is-active'), cumulative);
        // done
        setTimeout(() => {
          step.classList.remove('is-active');
          step.classList.add('is-done');
        }, cumulative + activeMs);
        cumulative += activeMs + gapMs;
      });
    },

    /**
     * Tool-Calls fade-in nacheinander.
     */
    revealToolCalls(root, opts = {}) {
      const calls = Array.from(root.querySelectorAll('.tool-call'));
      const gapMs = opts.gapMs || 1600;
      calls.forEach((c, i) => {
        setTimeout(() => c.classList.add('is-visible'), i * gapMs + 800);
      });
    },

    /**
     * Typewriter — tippt text in element, mit blinking cursor.
     * @param {HTMLElement} el - target (existierender cursor wird beibehalten am Ende)
     * @param {string} text
     * @param {object} opts - { charMs, onDone }
     */
    typewrite(el, text, opts = {}) {
      const charMs = opts.charMs || 18;
      let i = 0;
      const cursor = el.querySelector('.typing-cursor');
      // Body content vor cursor leeren
      Array.from(el.childNodes).forEach(n => {
        if (n !== cursor) el.removeChild(n);
      });

      function tick() {
        if (i >= text.length) {
          if (cursor) cursor.classList.add('is-done');
          if (typeof opts.onDone === 'function') opts.onDone();
          return;
        }
        const ch = text[i];
        const node = document.createTextNode(ch);
        el.insertBefore(node, cursor);
        i++;
        setTimeout(tick, ch === '\n' ? charMs * 4 : charMs);
      }
      tick();
    },

    /**
     * KPI-Counter — zählt von 0 zur Zielzahl.
     */
    countUp(el, target, opts = {}) {
      const dur = opts.dur || 1100;
      const suffix = opts.suffix || '';
      const prefix = opts.prefix || '';
      const decimals = opts.decimals || 0;
      const start = performance.now();
      function step(now) {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        const v = target * eased;
        el.textContent = prefix + v.toFixed(decimals).replace('.', ',') + suffix;
        if (t < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    },

    /**
     * Confidence-Bar fill.
     */
    fillBar(barEl, pct) {
      requestAnimationFrame(() => {
        barEl.style.width = pct + '%';
      });
    },
  };
})();
