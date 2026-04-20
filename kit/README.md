# Grothouse Design System

One shared radiance language, **24 distinct entity skins**.

## What's in the box

```
kit/
├── tokens.json              ← Single source of truth (24 entities + archetypes + surfaces)
├── tokens.js                ← Same tokens as a JS global (for static HTML)
├── grothouse-system.css     ← Universal radiance layer (drop into any site)
├── tailwind.preset.js       ← Tailwind v3 preset + v4 @theme snippet
├── react/index.jsx          ← React primitives (ThemeProvider, Radiance, GlowCard, …)
├── playground.css
├── playground.jsx
└── Theme Playground.html    ← Live 24-entity switcher
```

## How the theme axis works

Every entity is a composition of **four tokens**:

| Token         | Options                                                | What it controls                     |
|---------------|--------------------------------------------------------|--------------------------------------|
| `accent`      | Any hex + its light-mode twin                          | Brand color (plus auto "hot" hover)  |
| `secondary`   | Any hex + its light-mode twin                          | Orb cores, mesh depth                |
| `surfaceTone` | `iceCool` · `cool` · `neutral` · `warm` · `emberWarm`  | Black/white/grey temperature         |
| `glowLevel`   | `subtle` · `medium` · `intense`                        | Orb/noise/glow/grid intensity preset |
| `archetype`   | `holding` · `financial` · `real_estate` · `ai_tech` · `consumer` · `charitable` · `platform` · `consulting` | Motion speed + corner radii |

This keeps everything **black/white/grey + one brand color** while giving every site a unique fingerprint.

## Three ways to consume the system

### 1. Plain HTML / any stack

```html
<html data-entity="cooperate"
      data-archetype="ai_tech"
      data-surface="iceCool"
      data-glow="intense"
      data-theme="dark">
<head>
  <link rel="stylesheet" href="grothouse-system.css">
  <style>
    :root {
      --g-accent: #5F7FFF;
      --g-accent-hot: #8299FF;
      --g-secondary: #8B6FFF;
      --g-accent-rgb: 95, 127, 255;
      --g-secondary-rgb: 139, 111, 255;
    }
  </style>
</head>
<body>
  <section class="g-section">
    <div class="g-aurora-mesh"></div>
    <div class="g-orb g-orb-primary" style="width:520px;height:520px;top:-10%;left:-8%"></div>
    <div class="g-noise"></div>
    <div class="g-section-inner">…</div>
  </section>
</body>
</html>
```

### 2. Next.js + Tailwind (matches your g26x stack)

```js
// tailwind.config.js
module.exports = {
  presets: [require('./kit/tailwind.preset.js')],
  content: ['./app/**/*.{tsx,jsx}']
};
```

Import the CSS once in `app/layout.tsx`:

```jsx
import './kit/grothouse-system.css';
import tokens from './kit/tokens.json';

export default function Layout({ children, params }) {
  const entity = tokens.entities.find(e => e.id === params.entity);
  return (
    <html data-entity={entity.id}
          data-archetype={entity.archetype}
          data-surface={entity.surfaceTone}
          data-glow={entity.glowLevel}
          data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
```

Then use Tailwind classes that read from CSS vars:

```jsx
<h1 className="font-display text-fg-strong">
  Built on <span className="text-accent italic">Faith.</span>
</h1>
<button className="bg-accent-gradient shadow-glow text-white …">Get Started</button>
```

### 3. React components

```jsx
import { ThemeProvider, Section, Radiance, GlowCard, Display, DividerGlow } from './kit/react';

<ThemeProvider entity="foundation" theme="dark">
  <Section deep>
    <Radiance mesh orbs noise grid />
    <SectionInner>
      <Display glow as="h1">Rooted in Faith</Display>
      <DividerGlow />
    </SectionInner>
  </Section>
</ThemeProvider>
```

## Adding a new entity

Append to `tokens.json > entities`:

```json
{
  "id": "new_entity",
  "name": "Entity Name",
  "ticker": "ENT",
  "tagline": "Short promise.",
  "archetype": "platform",
  "surfaceTone": "cool",
  "glowLevel": "medium",
  "accent":    { "dark": "#...", "light": "#...", "name": "Label" },
  "secondary": { "dark": "#...", "light": "#...", "name": "Label" }
}
```

That's it. Every primitive (aurora, orbs, glows, borders, button, card, divider) re-colors automatically.

## The Theme Playground

Open `kit/Theme Playground.html`. Use the sidebar to:
- Search + filter by archetype
- Click any of the 24 entities to reskin the entire preview instantly
- Toggle each radiance layer (mesh / orbs / noise / grid)
- Switch dark ↔ light
- Copy-to-clipboard the theme as CSS, JSON, or the React provider snippet

## Current 24 entities

Holding: G26x · The Grothouse Family
Real Estate: GXRE · Hearth Interiors · G26x Residential · G26x Commercial
Management: GXMG · Family Office
Charitable: The Foundation
Consumer: Xperience Mortgage · HobbyBox
AI/Tech: Co-Operate · G6x AI · Unorthodox Labs · Neural Vault
Platforms: G6x Intelligence · Axon · Hive · OptX · ReVault · Node
Financial: RevoSure · The 5th Yr
Consulting: G6 Consulting
