/* global React */
const { useState, useEffect, useMemo, useRef } = React;

/* =========================================================
   Shared helpers
   ========================================================= */
window.pgHelpers = (() => {
  const hexToRgb = (hex) => {
    const h = hex.replace('#', '');
    const n = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
    return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
  };
  const lighten = (hex, amt) => {
    const h = hex.replace('#', '');
    const n = parseInt(h, 16);
    const r = Math.min(255, Math.round(((n >> 16) & 255) + (255 - ((n >> 16) & 255)) * amt));
    const g = Math.min(255, Math.round(((n >> 8) & 255) + (255 - ((n >> 8) & 255)) * amt));
    const b = Math.min(255, Math.round((n & 255) + (255 - (n & 255)) * amt));
    return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
  };
  // Hue shift keeping saturation/lightness via HSL round-trip
  const hexToHsl = (hex) => {
    const h = hex.replace('#', '');
    const n = parseInt(h, 16);
    let r = ((n >> 16) & 255) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let H, S, L = (max + min) / 2;
    if (max === min) { H = S = 0; }
    else {
      const d = max - min;
      S = L > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: H = (g - b) / d + (g < b ? 6 : 0); break;
        case g: H = (b - r) / d + 2; break;
        default: H = (r - g) / d + 4;
      }
      H *= 60;
    }
    return [H, S, L];
  };
  const hslToHex = (H, S, L) => {
    H = ((H % 360) + 360) % 360;
    const c = (1 - Math.abs(2 * L - 1)) * S;
    const x = c * (1 - Math.abs(((H / 60) % 2) - 1));
    const m = L - c / 2;
    let r, g, b;
    if (H < 60)       [r, g, b] = [c, x, 0];
    else if (H < 120) [r, g, b] = [x, c, 0];
    else if (H < 180) [r, g, b] = [0, c, x];
    else if (H < 240) [r, g, b] = [0, x, c];
    else if (H < 300) [r, g, b] = [x, 0, c];
    else              [r, g, b] = [c, 0, x];
    const to = v => Math.round((v + m) * 255).toString(16).padStart(2, '0');
    return '#' + to(r) + to(g) + to(b);
  };
  const shiftHue = (hex, deg) => {
    const [H, S, L] = hexToHsl(hex);
    return hslToHex(H + deg, S, L);
  };
  return { hexToRgb, lighten, shiftHue };
})();
