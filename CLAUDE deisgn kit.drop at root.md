# Grothouse Design System

This project uses the **Grothouse universal design system**.

## Canonical style — always the default

**The Grothouse Family**
- Accent: Cobalt `#3944BC` · Secondary: Azure `#5464D8`
- Surface: `cool` · Glow: `medium` · Archetype: `holding`
- Preset: `editorial` · Layout: `classic` · Theme: `dark`

Unless the user explicitly names a different entity from `kit/tokens.json`,
always start with Grothouse Family.

## Core rules

1. **Import `kit/grothouse-system.css` as the base layer.** It defines every radiance
   primitive (aurora mesh, orbs, noise, glow, cards, buttons, dividers) and reads
   everything from CSS variables.
2. **Set entity attrs on `<html>`:**
   ```html
   <html data-entity="grothouse_family"
         data-archetype="holding"
         data-surface="cool"
         data-glow="medium"
         data-preset="editorial"
         data-theme="dark">
   ```
3. **Never invent colors.** All 24 entity accents sit in the blue family (hue 210–260°).
   Pick from `kit/tokens.json > entities`.
4. **Typography:** Source Serif 4 (display) · Outfit (body) · JetBrains Mono (mono).
   Load via Google Fonts.
5. **Use kit primitives in React:** `ThemeProvider`, `Radiance`, `GlowCard`, `Section`,
   `Display`, `DividerGlow` from `kit/react/index.jsx`.
6. **Tailwind projects:** extend with `kit/tailwind.preset.js`.

## Five style presets (Style DNA)

Each entity can render in one of five presets. `editorial` is the canonical default.

| Preset | Character |
|---|---|
| `editorial` | Serif display, generous whitespace, subtle radiance |
| `brutalist` | Mono-first, 0-radius, heavy borders |
| `glass` | Frosted translucent cards, max radiance |
| `minimal` | Sans-only, flat, near-monochrome |
| `maximalist` | Gradients everywhere, oversize type |

## Four hero layouts

`classic` (default) · `split` (copy + data visual) · `centered` · `asymmetric`

## 24 entities

See `kit/tokens.json`. Organized by archetype:
- **Holding:** G26x · Grothouse Family
- **Real Estate:** GXRE · Hearth · Residential · Commercial
- **Management:** GXMG · Family Office
- **Charitable:** The Foundation
- **Consumer:** Xperience Mortgage · HobbyBox
- **AI/Tech:** Co-Operate · G6x AI · Unorthodox Labs · Neural Vault
- **Platforms:** G6x Intelligence · Axon · Hive · OptX · ReVault · Node
- **Financial:** RevoSure · The 5th Yr
- **Consulting:** G6 Consulting

## Quick commands

- **Explore themes visually:** open `kit/Theme Playground.html`
- **Add a new entity:** append to `kit/tokens.json > entities` — all primitives
  auto-reskin (see `kit/README.md` for the entity schema).
- **New site in this system:** copy the Grothouse Family root layout from
  `The Grothouse Family.html` as a starting point.

## Files

```
kit/
├── tokens.json              ← Source of truth (24 entities + base + archetypes + surfaces)
├── tokens.js                ← Same tokens as a JS global (for static HTML)
├── grothouse-system.css     ← Universal radiance layer
├── tailwind.preset.js       ← Tailwind v3/v4 preset
├── react/index.jsx          ← React primitives
├── playground-presets.js    ← 5 style DNAs + font pairs + layouts
├── playground*.{jsx,css,js} ← Theme Playground source
├── Theme Playground.html    ← Live 24-entity switcher
└── README.md                ← Full usage docs
```
