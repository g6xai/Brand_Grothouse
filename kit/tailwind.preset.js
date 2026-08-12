/**
 * Grothouse Design System — Tailwind preset (Apple HIG)
 *
 * Canonical standard: DriveX design/APPLE-HIG-STANDARD.md
 * Local deltas:       docs/APPLE-HIG-STANDARD.md
 * Token source:       kit/tokens.json (checked by scripts/build-tokens.mjs)
 *
 * Every value here resolves to a CSS custom property defined in
 * grothouse-system.css. There are deliberately NO hex literals in this file:
 * a preset that hard-codes colour is a second source of truth, and two
 * sources of truth is how twenty-four entity skins stopped agreeing.
 *
 * Usage (Tailwind v3):
 *   presets: [require('./kit/tailwind.preset.js')]
 * Tailwind v4 (CSS-first): just @import grothouse-system.css — the tokens are
 * already custom properties and need no preset at all.
 */

module.exports = {
  theme: {
    /* Spacing REPLACES rather than extends Tailwind's scale. Extending leaves
       every half-step (0.5 1.5 2.5 3.5) and intermediate step (5 7 9 10 11 14)
       available, and those are the values the 8pt grid exists to remove. Seven
       values, plus px/full for borders and fills. */
    spacing: {
      0: '0px',
      px: '1px',
      1: 'var(--space-1)',
      2: 'var(--space-2)',
      3: 'var(--space-3)',
      4: 'var(--space-4)',
      6: 'var(--space-6)',
      8: 'var(--space-8)',
      12: 'var(--space-12)',
      full: '100%',
    },

    /* Five sizes. Nothing below 12px exists to be reached for. */
    fontSize: {
      caption: ['var(--text-caption)', { lineHeight: 'var(--leading-caption)' }],
      body: ['var(--text-body)', { lineHeight: 'var(--leading-body)' }],
      'title-2': ['var(--text-title-2)', { lineHeight: 'var(--leading-title-2)' }],
      'title-1': ['var(--text-title-1)', { lineHeight: 'var(--leading-title-1)' }],
      display: ['var(--text-display)', { lineHeight: 'var(--leading-display)' }],
    },

    /* Two radii plus pills. Apple's own buttons measure 980px — buttons are
       pills; inputs and selects stay at the control radius. */
    borderRadius: {
      none: '0px',
      control: 'var(--radius-control)',
      card: 'var(--radius-card)',
      pill: 'var(--radius-pill)',
      full: '9999px',
    },

    /* No wide tracking exists. Measured on apple.com: zero elements above
       0.1em, across four page/viewport combinations. */
    letterSpacing: {
      tight: '-0.02em',
      snug: '-0.015em',
      normal: '0em',
    },

    transitionDuration: {
      fast: 'var(--motion-fast)',
      DEFAULT: 'var(--motion-standard)',
      standard: 'var(--motion-standard)',
      emphasis: 'var(--motion-emphasis)',
    },

    transitionTimingFunction: {
      DEFAULT: 'var(--ease-out)',
      out: 'var(--ease-out)',
    },

    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-text': 'var(--color-primary-text)',
        'on-primary': 'var(--color-on-primary)',
        bg: 'var(--color-bg)',
        card: 'var(--color-card)',
        sunken: 'var(--color-sunken)',
        ink: 'var(--color-ink)',
        secondary: 'var(--color-secondary)',
        border: 'var(--color-border)',
        material: 'var(--color-material)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
      },

      fontFamily: {
        /* One family. `id` is the only monospace, and it is for machine
           identifiers where character alignment carries meaning — never
           decoration. */
        sans: 'var(--font-system)',
        id: 'var(--font-id)',
      },

      fontWeight: {
        /* Apple leans on 600 far more than 400: 17px/600 is the single most
           common pairing measured on apple.com's home page. Semibold is the
           default for labels and titles, not an emphasis. */
        normal: '400',
        semibold: '600',
        bold: '700',
      },

      maxWidth: {
        container: 'var(--container-max)',
        prose: '65ch',
      },

      minHeight: {
        tap: 'var(--tap-target)',
      },
      minWidth: {
        tap: 'var(--tap-target)',
      },

      backdropBlur: {
        material: 'var(--blur-material)',
      },
    },
  },
};
