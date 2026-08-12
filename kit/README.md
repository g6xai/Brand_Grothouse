# Grothouse Design System

Apple HIG. Black, white, grey, and **one accent per surface**.

**Canonical standard:** `c:/Users/tony.grothouse/code/DriveX/design/APPLE-HIG-STANDARD.md`
**This repo's deltas:** [`docs/APPLE-HIG-STANDARD.md`](../docs/APPLE-HIG-STANDARD.md)

Where anything here disagrees with the canonical standard, **the standard wins
and this file is the bug.**

## What's in the box

```
kit/
├── tokens.json              ← SOURCE OF TRUTH
├── tokens.js                ← GENERATED from tokens.json — do not edit
├── grothouse-system.css     ← The token layer + primitives
├── tailwind.preset.js       ← Tailwind bindings (no hex, all var())
├── theme-toggle.css/.js     ← Drop-in light/dark toggle
├── react/index.jsx          ← React primitives
└── Theme Playground.html    ← Live token audit, all 24 entities
```

## The colour law

| Accent | Scope | Dark | Light |
|---|---|---|---|
| Co-Operate Blue | Grothouse default, platforms, websites, logos | `#5F7FFF` | `#1249E5` |
| Xperience Teal | G26xM, Xperience, Zeus, consumer-facing | `#14C8A6` | `#0E8C74` |

One accent per surface, always consumed as `--color-primary`. **A raw hex in a
component is a violation.**

> **The teal has a constraint.** `#0E8C74` measures 3.84:1 on the light
> background — it clears the 3:1 bar for UI boundaries and 22px+ text, and fails
> the 4.5:1 bar for body text. Use `--color-primary-text` (`#0B7A64`, 4.84:1)
> for accent text below 22px and for filled-button labels. See
> [`docs/APPLE-HIG-STANDARD.md` §2.2](../docs/APPLE-HIG-STANDARD.md).

Every ratio in `tokens.json` is measured by `node scripts/contrast.mjs`, not
asserted. Re-run it before changing a colour.

## The system

| | |
|---|---|
| **Type** | One family (system stack). 34 / 28 / 22 / **17 default** / 13. Floor 12px. Sentence case only. |
| **Radius** | 12 control · 16 card · pill buttons |
| **Motion** | 150 / **250 default** / 350ms, `cubic-bezier(0.32, 0.72, 0, 1)`. Reduced motion zeroes all of it. |
| **Space** | 8pt grid, seven values: 4 / 8 / 12 / 16 / 24 / 32 / 48 |
| **Depth** | Translucency + backdrop blur, and surface-tone steps. Not glow. |

## Consuming the system

### Plain HTML

```html
<html data-entity="grothouse_family" data-accent="blue" data-theme="light">
<head>
  <link rel="stylesheet" href="kit/grothouse-system.css">
</head>
<body>
  <main class="hig-container hig-section">
    <h1 class="hig-display">Built on faith, driven by purpose.</h1>
    <div class="hig-card">
      <h2 class="hig-title-2">Card</h2>
      <p class="hig-body">Body copy at 17px.</p>
    </div>
    <button class="hig-button hig-button-primary">Primary</button>
  </main>
</body>
</html>
```

No webfont link. The system stack ships with the operating system.

### Tailwind

```js
// tailwind.config.js
module.exports = {
  presets: [require('./kit/tailwind.preset.js')],
  content: ['./app/**/*.{tsx,jsx}'],
};
```

The preset **replaces** Tailwind's spacing and radius scales rather than
extending them — extending would leave every half-step (`0.5 1.5 2.5`) and
intermediate step (`5 7 9 10 11 14`) available, and removing those is the entire
reason the 8pt grid exists.

On Tailwind v4 you need no preset at all: the tokens are already CSS custom
properties, so `@import` the stylesheet.

### React

```jsx
import { ThemeProvider, Container, Display, Body, Card, Button } from './kit/react';

<ThemeProvider entity="xperience_mortgage" theme="light">
  <Container>
    <Display>Curated by you, for you.</Display>
    <Card>
      <Body>The accent follows the entity — teal, here.</Body>
      <Button variant="primary">Start</Button>
    </Card>
  </Container>
</ThemeProvider>
```

The accent is read from the entity and cannot be passed in. Letting a caller
override it is how a third accent appears.

## Adding an entity

Append to `tokens.json > entities`:

```json
{
  "id": "new_entity",
  "name": "Entity Name",
  "ticker": "ENT",
  "tagline": "Short promise.",
  "group": "platform",
  "accent": "blue"
}
```

`group` is taxonomy only — it has **no visual consequence**. That was the point
of retiring the archetype axis.

Then regenerate the mirror:

```bash
node scripts/build-tokens.mjs
```

## Gates

All of these run in CI on every pull request.

```bash
node scripts/hig-lint-ratchet.mjs             # no section may grow
node scripts/hig-lint-ratchet.mjs --report    # per-rule, per-file detail
node scripts/build-tokens.mjs --check         # tokens.js and CSS match tokens.json
node scripts/check-assets.mjs                 # dead links, JSON, CSS balance
node scripts/contrast.mjs '#0E8C74' '#FFFFFF' # measure a pair
```

Every section currently reads **0**, so the baseline is all zeros and the rules
are a **hard ban** — any new violation fails the gate.

`kit/tokens.js` is generated. Editing it by hand fails `--check`.

## What was retired

The four-axis matrix (accent × surface tone × glow level × archetype), all
radiance primitives (`g-aurora-mesh`, `g-orb*`, `g-noise`, `g-grid-tex`,
`g-text-glow`, `g-divider-glow`), the serif/sans/mono three-face split, the five
style presets, archetype radii, and archetype speed multipliers.

**Exempt: logos and taglines.** Nothing else.

## The 24 entities

Rendered live from `tokens.json` in [Brand Guidelines](../Brand%20Guidelines.html)
and the [Token Playground](Theme%20Playground.html), so no list here can drift
from the source.

Teal: Xperience Mortgage · HobbyBox. Everything else: blue.
