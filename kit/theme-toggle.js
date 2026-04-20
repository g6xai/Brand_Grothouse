// Grothouse theme toggle — light default, dark optional, localStorage persistence.
// Pages opt in by setting data-theme="light" on <html> AND including this script.
// Consumer pages are light-default. Developer/internal pages (COOP) stay dark.
(function () {
  const KEY = 'grothouse-theme';
  const root = document.documentElement;

  // Read saved preference; fall back to whatever data-theme is already on <html>.
  const saved = (() => { try { return localStorage.getItem(KEY); } catch { return null; } })();
  if (saved === 'light' || saved === 'dark') {
    root.setAttribute('data-theme', saved);
  }

  function currentTheme() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    try { localStorage.setItem(KEY, t); } catch {}
    updateButton();
  }

  function updateButton() {
    const btns = document.querySelectorAll('[data-theme-toggle]');
    const t = currentTheme();
    btns.forEach(btn => {
      btn.setAttribute('aria-label', t === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
      btn.setAttribute('data-current', t);
    });
  }

  function toggle() {
    applyTheme(currentTheme() === 'light' ? 'dark' : 'light');
  }

  // Wire any [data-theme-toggle] button on the page.
  function wire() {
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      if (btn.__wired) return;
      btn.__wired = true;
      btn.addEventListener('click', toggle);
    });
    updateButton();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wire);
  } else {
    wire();
  }

  // Expose for programmatic use.
  window.GrothouseTheme = { toggle, set: applyTheme, get: currentTheme };
})();
