# G26x Brand System — Complete Design Reference
## For Claude Design Upload

---

## BRAND OVERVIEW

G26x is a holding company with two primary web properties:
1. **G26x Corporate** — Holding company site (g26x.com)
2. **Xperience Mortgage (G26xM)** — Consumer mortgage lending site

**Foundation palette:** Black + White + Grey tones, with blues for highlights and prominence.
Both sites use multi-blue radiant effects, aurora mesh backgrounds, and noise grain overlays.

---

## MASTER BLUE PALETTE (4 blues only)

| Name | Hex | Role |
|------|-----|------|
| **Cobalt** | #1338BE | Primary accent (light mode), hover states, G26x brand mark |
| **Azure** | #1520A6 | Secondary accent — aurora mesh, gradient depth |
| **Blue** | #3944BC | Primary accent (dark mode) — buttons, CTAs, glow effects, text highlights |
| **Navy** | #0A1172 | Deepest accent — gradient cores, orb depth, dark emphasis |

## MASTER GREY PALETTE

| Name | Hex | Role |
|------|-----|------|
| **Slate** | #757C88 | Secondary text, muted labels |
| **Stone** | #59788E | Tertiary text (blue-tinted grey) |
| **Spruce** | #2C3E4C | Dark muted text, tickers |
| White | #FFFFFF | Light backgrounds, primary text on dark |
| Near-white | #F0F2F5 | Light mode muted surfaces |
| Light grey | #D8DCE4 | Light mode borders |
| Mid grey | #B8BCC8 | Light mode secondary text |
| Dark grey | #1E2230 | Dark mode muted surfaces |
| Near-black | #0B0E14 | Dark mode backgrounds |

---

# PART 1: G26x CORPORATE SITE

**Stack:** Next.js 16, Tailwind CSS v4, Source Serif 4 + Outfit + JetBrains Mono
**Preview:** https://g26x-site-mib7ealfh-g6xai.vercel.app

## Color System

### Dark Mode (Default)
| Token | Hex | Usage |
|-------|-----|-------|
| char | #0B0E14 | Primary background (near-black) |
| char-mid | #111520 | Card backgrounds |
| char-light | #1A1E2C | Muted surfaces |
| ember (dark) | #3944BC | Primary accent (Blue) |
| sand | #3944BC | Secondary accent |
| parchment | #F0F0F0 | Primary text on dark |
| foreground | #E8EAF0 | Body text on dark |
| muted-foreground | #757C88 | Secondary text (Slate) |
| border | rgba(57,68,188,0.12) | Borders (blue-tinted) |

### Light Mode
| Token | Hex | Usage |
|-------|-----|-------|
| background | #FFFFFF | Primary background |
| foreground | #111111 | Primary text |
| ember (light) | #1338BE | Primary accent (Cobalt) |
| sand | #3944BC | Secondary accent |
| card | #FFFFFF | Card surface |
| muted | #F2F3F5 | Muted surfaces |
| muted-foreground | #757C88 | Secondary text (Slate) |
| border | rgba(0,0,0,0.10) | Borders |

### Force Dark Accent
Class `.force-dark-accent` always uses Blue `#3944BC` even in light mode. Applied to Hero, Verticals, Contact, Footer.

### Named Text Colors (Tailwind)
- `text-slate` → #757C88 (secondary text, navigation)
- `text-stone` → #59788E (body text on dark, descriptions)
- `text-spruce` → #2C3E4C (tickers, very muted labels)

## Typography

### Font Stack
| Role | Family | Weights | Usage |
|------|--------|---------|-------|
| Display | Source Serif 4 | 400, 600, 700 | Headings, hero titles |
| Body | Outfit | 300–800 | Paragraphs, descriptions |
| Industrial | JetBrains Mono | 500, 700 | Labels, buttons, overlines, tickers |

### Type Scale
| Element | Size | Weight | Font | Tracking |
|---------|------|--------|------|----------|
| Hero H1 | clamp(38px, 6vw, 72px) | 700 | Display | tight |
| Section H2 | clamp(24px, 3.2vw, 36px) | 700 | Display | tight |
| Subsection H3 | clamp(20px, 2.5vw, 28px) | 700 | Display | tight |
| Overline | 11px | 700 | Industrial | 4px, uppercase |
| Body | 14px | 400 | Body | normal |
| Small body | 11–12px | 400 | Body | normal |
| Button | 10–11px | 700 | Industrial | 2–2.5px, uppercase |
| Tag/Label | 8–9px | 700 | Industrial | 2–3px, uppercase |
| Ticker | 8–10px | 700 | Industrial | 2–3px |

## Layout

- **Max-width:** 800px (content), 900px (hero)
- **Padding:** px-5 md:px-8 (20px mobile, 32px desktop)
- **Section spacing:** py-18 md:py-24
- **Grid:** sm:grid-cols-2 lg:grid-cols-3 gap-px (portfolio)

## Radiant Effects (Multi-Blue System)

### Aurora Mesh
Four layered radial gradients using all 4 blues:
- Ellipse 1: Cobalt rgba(19,56,190,0.08) at 20% 80%
- Ellipse 2: Azure rgba(21,32,166,0.06) at 80% 20%
- Ellipse 3: Blue rgba(57,68,188,0.04) at 50% 50%
- Ellipse 4: Navy rgba(10,17,114,0.05) at 70% 70%

### Radiant Orbs (3 types)
Three orb variants using different blue combinations for depth:

**`.radiant-orb`** — Primary (Cobalt → Azure → Navy gradient)
- Radial gradient: rgba(19,56,190,0.16) → rgba(21,32,166,0.08) → rgba(10,17,114,0.04) → transparent
- Filter: blur(60px), Sizes: 400–600px

**`.radiant-orb-sky`** — Blue-tinted (Blue → Cobalt)
- Radial gradient: rgba(57,68,188,0.14) → rgba(19,56,190,0.06) → transparent
- Filter: blur(60px), Sizes: 300–500px

**`.radiant-orb-arctic`** — Brightest (Blue core)
- Radial gradient: rgba(57,68,188,0.12) → rgba(21,32,166,0.05) → transparent
- Filter: blur(50px), Sizes: 250–350px

All orbs animate with aurora-drift (12s infinite), staggered delays (-3s, -6s, -8s).

### Noise Overlay
Fractal noise texture via SVG filter on ::before pseudo-element:
- Opacity: 0.35
- Mix-blend-mode: overlay
- Background-size: 128px repeat

### Grid Texture
Subtle crosshatch pattern on dark sections:
- Size: 60x60px
- Color: rgba(100,120,160,0.03)

### Text Glow (Blue halo)
```css
text-shadow: 0 0 40px rgba(57,68,188,0.4), 0 0 80px rgba(19,56,190,0.2);
```

### Text Sparkle (Blue — for key stats)
```css
text-shadow: 0 0 20px rgba(57,68,188,0.5), 0 0 60px rgba(19,56,190,0.25);
```

### Glow Card (Cobalt hover)
Hover state adds:
- box-shadow: 0 0 20px rgba(19,56,190,0.12), 0 4px 30px rgba(0,0,0,0.3)
- border-color: rgba(19,56,190,0.18)

### Accent Bar Glow (Cobalt + Blue)
```css
box-shadow: 0 0 12px rgba(19,56,190,0.4), 0 0 24px rgba(57,68,188,0.2);
```

### Section Divider Glow (Cobalt → Blue gradient)
```css
background: linear-gradient(90deg, #1338BE, #3944BC);
box-shadow: 0 0 12px rgba(19,56,190,0.4), 0 0 24px rgba(57,68,188,0.2);
```

## Animations

| Name | Duration | Loop | Effect |
|------|----------|------|--------|
| hero-fade-in | 0.8s | once | opacity 0→1, translateY(16px→0) |
| fade-up | 0.6s | once (on scroll) | opacity 0→1, translateY(24px→0) |
| aurora-drift | 12s | infinite | translate + scale orbs |
| pulse-glow | 4s | infinite | text-shadow opacity oscillation |
| scroll-bounce | 2s | infinite | translateY(0→6px→0) |

Fade-up delays: 0.08s increments (delay-1 through delay-4)

## Page Structure

### Home (/)
1. **Hero** — Full viewport, dark bg, 3 radiant orbs, aurora mesh, noise overlay. H1: "DISCIPLINE BUILDS EMPIRES." Ticker strip at bottom with entity codes.
2. **About** — Light bg. Stats bar (3 metrics), 2-column grid with narrative text.
3. **Verticals** — Dark bg. 4 operational pillars in vertical list (R&D, Sales, Platforms, Marketing). Icon boxes with hover glow.
4. **Portfolio** — Light bg. Entity grid (sm:2-col, lg:3-col) with filter buttons (ALL, R&D, PLATFORMS, SALES, MARKETING). Cards show ticker, name, type, description, badges.
5. **Contact** — Dark bg. 2-column: left CTA with button, right company info card with left border accent.
6. **Footer** — Dark bg. Logo + nav links + copyright. Tagline: "Built on faith. Driven by purpose."

### Privacy (/privacy)
Dark hero banner, 10-section policy. DRAFT banner. Numbered sections 01–10.

### Terms (/terms)
Same layout as privacy. 13-section terms of service. Ohio governing law.

## Component Patterns

### Navigation
- Fixed top, h-16, transparent → blurred bg on scroll
- Logo: "G26X" in display font
- Links: Industrial font, 10px, uppercase, tracking-[2.5px]
- Theme toggle: 8x8 button with Sun/Moon icon
- Mobile: Hamburger → slide drawer

### Entity Card
- bg-card, p-5, gap-px border grid
- Top accent bar: scaleX(0→1) on hover
- Ticker with dot indicator (1.5px ember square)
- Name: display 15px bold
- Type: overline 8px
- Description: body 11px, line-clamp-2
- Optional: Coming Soon badge, platform tags

### Contact Modal
- 480px max-width dialog
- Form: name, email, subject (select), message (textarea)
- Labels: Industrial 9px
- Inputs: bg-background, border-border, focus:border-ember
- Submit: bg-ember text-char, Industrial uppercase

### Entity Modal
- 460px max-width dialog
- 2px top accent bar
- Ticker + title + type overline
- Description body
- Optional: website link, platforms list, coming soon badge

---

# PART 2: XPERIENCE MORTGAGE (G26xM)

**Stack:** Next.js 14, Tailwind CSS 3, DM Sans + Instrument Serif
**Preview:** https://xperience-website-lh0wy9ivg-g6xai.vercel.app

## Color System

### Dark Mode (Default)
| Token | Hex | Usage |
|-------|-----|-------|
| bg | #0B0E14 | Primary background (near-black) |
| card | #111520 | Card surfaces |
| muted | #181D2A | Muted surfaces, inputs |
| subtle | #0E1118 | Alternating section bg |
| border | #1E2438 | Borders |
| borderHover | #2A3148 | Hover borders |
| text | #FAFAFA | Primary text |
| textSec | #A0A8B8 | Secondary text |
| textMut | #59788E | Muted text (Stone) |
| accent | #3944BC | Primary accent (Blue) |
| accentHover | #1338BE | Accent hover (Cobalt) |
| g26x | #1338BE | G26x brand color (Cobalt) |

### Light Mode
| Token | Hex | Usage |
|-------|-----|-------|
| bg | #FFFFFF | Primary background |
| card | #FFFFFF | Card surfaces |
| muted | #F0F2F5 | Alternating sections (cool grey) |
| subtle | #F5F6F8 | Subtle surfaces |
| border | #D8DCE4 | Borders |
| text | #0A0A0A | Primary text |
| textSec | #2F2F2F | Secondary text |
| textMut | #757C88 | Muted text (Slate) |
| accent | #1338BE | Primary accent (Cobalt) |
| accentHover | #0A1172 | Accent hover (Navy) |
| g26x | #1338BE | G26x brand color (Cobalt) |

### Mood System (6 accent overrides)
| Mood | Color | Effect |
|------|-------|--------|
| Clean (default) | null (uses theme accent) | Standard blue |
| Sage | #16A34A | Green accent |
| Dusk | #7C3AED | Purple accent |
| Ember | #EA580C | Orange accent |
| Rose | #E11D48 | Red/pink accent |
| Amber | #D97706 | Gold accent |

Mood persisted via cookie (`xp_mood`, 1-year expiry). Theme persisted via cookie (`xp_theme`).

## Typography

### Font Stack
| Role | Family | Weights | Usage |
|------|--------|---------|-------|
| Body | DM Sans | 400, 500, 600, 700, 800 | Everything except display |
| Display | Instrument Serif | 400 | Hero titles, section headings, quotes |

### Type Scale
| Element | Size | Weight | Font | Notes |
|---------|------|--------|------|-------|
| Hero H1 | clamp(40px, 6vw, 68px) | 400 | Display | Italic accent words |
| Section H2 | clamp(24px, 4vw, 36px) | 400 | Display | |
| Card H3 | 20–22px | 400 | Display | |
| Overline | 11px | 600 | Body | letter-spacing 0.06–0.16em, uppercase |
| Body | 14–16px | 400–500 | Body | line-height 1.6–1.7 |
| Small | 11–13px | 400–500 | Body | |
| Button | 13–15px | 600 | Body | |
| Badge | 10–11px | 500–600 | Body | |
| Tiny label | 8–10px | 500–600 | Body | uppercase, letter-spacing |

## Layout

- **Max-width:** 1120px (site frame), 1080px (playground)
- **Padding:** clamp(16px, 4vw, 40px) sides
- **Section spacing:** paddingTop/Bottom 48–72px
- **Breakpoints:** 1024px, 768px, 480px

## Radiant Effects (Multi-Blue System)

Same 4-blue palette as G26x, prefixed with `xp-` in CSS class names.

### Aurora Mesh (`.xp-aurora-mesh`)
Four layered radial gradients using all 4 blues:
- Ellipse 1: Cobalt rgba(19,56,190,0.08) at 20% 80%
- Ellipse 2: Azure rgba(21,32,166,0.06) at 80% 20%
- Ellipse 3: Blue rgba(57,68,188,0.04) at 50% 50%
- Ellipse 4: Navy rgba(10,17,114,0.05) at 60% 60%

### Radiant Orbs (3 types, same gradients as G26x)
**`.xp-radiant-orb`** — Primary (Cobalt → Azure → Navy)
**`.xp-radiant-orb-sky`** — Blue-tinted (Blue → Cobalt)
**`.xp-radiant-orb-arctic`** — Brightest (Blue core)
All animate with aurora-drift (12s infinite).

### Text Glow (`.xp-text-glow`)
```css
text-shadow: 0 0 40px rgba(57,68,188,0.4), 0 0 80px rgba(19,56,190,0.2);
```

### Text Sparkle (`.xp-text-sparkle`)
```css
text-shadow: 0 0 20px rgba(57,68,188,0.5), 0 0 60px rgba(19,56,190,0.25);
```

### Glow Card (`.xp-glow-card`)
Radial gradient at cursor position on hover:
```css
radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(19,56,190,0.08) 0%, transparent 60%)
```

### Card Hover (Dark Mode)
```css
box-shadow: 0 12px 32px rgba(0,0,0,0.3), 0 0 20px rgba(19,56,190,0.08);
```

### Accent Bar Glow (`.xp-accent-bar-glow`)
```css
box-shadow: 0 0 12px rgba(19,56,190,0.4), 0 0 24px rgba(57,68,188,0.2);
```

### Section Divider (`.xp-section-divider-glow`)
```css
background: linear-gradient(90deg, transparent 0%, rgba(19,56,190,0.3) 50%, transparent 100%);
```

### Noise Overlay (`.xp-noise-overlay`)
Same fractal noise SVG filter as G26x, opacity 0.5.

## Page Structure

### Home Page
All sections rendered inline in a single 1500+ line component. Uses inline styles driven by theme object.

1. **Welcome Modal** — First-visit mood picker. Theme toggle (Dark/Light), 6 mood color swatches, "Enter Xperience" CTA.
2. **Navigation** — Fixed, glassmorphism. Logo: "G26x^M | Xperience Mortgage". 7 nav links + theme toggle + mood picker + music picker. Mobile hamburger drawer.
3. **Hero** — Aurora mesh + 2 radiant orbs. H1 in Instrument Serif: "Curated *by you*, for *you*." with text-glow. 3 stat badges (14 days, $4,200 saved, 99.2% on-time). Trust badges (Bank Security, NMLS, Equal Housing).
4. **Marquee** — Scrolling ticker strip with credentials (NMLS, Equal Housing, 50-State, A+ BBB, AI-Powered, 14-Day, G26xM).
5. **Rates Preview** — "Today's Rates" grid. 6 product cards (Conv, FHA, VA, Jumbo, DSCR, Non-QM) with live/sample rate display.
6. **Case Studies** — Tabbed carousel (Speed | Savings | AI Advantage). Metric comparison cards with Xperience vs Industry.
7. **Inline CTA** — "How much home *can you afford*?" with text-glow. Links to capture modal.
8. **Playground Highlight** — Large card linking to /playground with Sparkles icon and "Try It Free" button. Glow card effect.
9. **Testimonials** — 4 review cards with 5-star ratings, quotes, names, locations, tags. Glow card effect.
10. **Three Promises** — Trust pillars (LXM, AI Transparency, Fair Lending). 3 glow cards with icons.
11. **CTA** — "Your dream home is *closer than you think*." Aurora mesh + 2 radiant orbs + noise overlay. Full radiant treatment.
12. **Footer** — 4-column grid (Brand, Products, Resources, Company). Legal disclaimer. Equal Housing icon. Copyright.
13. **Sticky Bar** — Fixed bottom capture CTA, glassmorphism pill shape, dismissible.

### Rates Page
Full product matrix with expandable detail sections. Each product shows eligibility criteria, min credit, min down, max LTV, max DTI.

### Calculator Page
4 interactive sliders (home price, down payment, rate, term). Real-time monthly payment calculation with breakdown.

### About Page
Founder quote, 6 stats grid, G26x ecosystem cards, 9-person leadership team grid.

### FAQ Page
11 expandable accordion items covering speed, pricing, credit, loan types, Olympus, LXM, AI, data security.

### Playground (/playground)
Complex interactive dashboard: sidebar inputs + main results area. Goal selector, product tabs, multiple sliders, scenario comparison, rent vs. buy analysis.

### Why Xperience (/why-xperience)
Founder message, hidden cost breakdown with interactive loan slider, three pillars (Cash/Capital/Wealth), comparison table.

### Articles (/articles)
Article grid with category badges, read time, featured flags.

### Foundation (/foundation)
641 Foundation nonprofit page with three pillars (Partner, Steward, Multiply).

## Component Patterns

### Button Styles
- **Primary:** accent bg, white text, rounded-8px, hover: translateY(-1px) + glow shadow
- **Secondary:** card bg, border, hover: translateY(-3px) + deeper shadow
- **Pulse:** `animation: subtlePulse 3s infinite` — accent box-shadow breathe

### Card Styles
- Background: theme.card
- Border: 1px solid theme.border
- Border-radius: 10–16px
- Shadow: theme.shadow
- Hover: translateY(-3px), border-color change, glow shadow (dark mode)

### Input Styles
- Background: theme.inputBg
- Border: 1px solid theme.inputBorder
- Border-radius: 8px
- Focus: accent border color
- Range sliders: Custom thumb (20px circle, accent bg, 3px border ring)

### Modal Pattern
- Overlay: rgba(0,0,0,0.6) + backdrop-blur(8px)
- Card: theme.card bg, border, rounded-16px, shadow, padding 28px
- Close: top-right X button
- Progress bar: accent-colored fill

---

# PART 3: SHARED BRAND DNA

## What Both Sites Share
1. **Multi-Blue Radiance** — 4-blue palette (Cobalt, Azure, Blue, Navy) used for radiant orbs, aurora meshes, text glows, noise grain overlays
2. **G26x Brand Mark** — Always in Cobalt #1338BE
3. **Industrial Typography** — Uppercase labels with wide letter-spacing for navigation, buttons, badges
4. **Serif Display Headlines** — Source Serif 4 (G26x) or Instrument Serif (Xperience) for hero titles and section headings
5. **Glow Effects** — Text glow on accent-colored headlines, card hover glow, accent bar glow, section divider glow — all using the 4 blues
6. **Dark-First Design** — Dark mode is the primary/default experience
7. **Minimal Color Palette** — Black + White + Grey tones, with the 4 blues for highlights and prominence
8. **Grid Texture** — Subtle crosshatch pattern on dark sections using rgba(57,68,188,0.03)
9. **Surface Palette** — Dark surfaces use #0B0E14 (bg), #111520 (card), blue-tinted borders

## Key Visual Differences
| Property | G26x Corporate | Xperience Mortgage |
|----------|---------------|-------------------|
| Dark Accent | #3944BC (Blue) | #3944BC (Blue) |
| Light Accent | #1338BE (Cobalt) | #1338BE (Cobalt) |
| Display Font | Source Serif 4 | Instrument Serif |
| Body Font | Outfit | DM Sans |
| Industrial Font | JetBrains Mono | DM Sans (styled) |
| Max Width | 800px | 1120px |
| Theme System | CSS variables + next-themes | JS object + inline styles |
| Dark BG | #0B0E14 | #0B0E14 |
| Card BG | #111520 | #111520 |
| Mood System | No | Yes (6 accent overrides) |
| CSS Prefix | `.radiant-orb`, `.aurora-mesh` | `.xp-radiant-orb`, `.xp-aurora-mesh` |
| Tone | Corporate / austere | Consumer / editorial |
| Imagery | None (typography-driven) | None (typography-driven) |

## Entity Reference

### G26x Portfolio Companies
| Ticker | Name | Vertical | Status |
|--------|------|----------|--------|
| G6AI | G26x AI | R&D | Active |
| ULAB | Unorthodox Labs | Marketing | Active |
| COOP | Co-Operate | Sales | Active |
| G6C | G26x Consulting | Sales | Active |
| G6X | G26x Intelligence Platform | Platforms | Active (4 sub-platforms) |
| 5YR | 5-Year Brand Xperience | Marketing | Active |
| G26M | [Stealth] | Marketing | Coming Soon |
| G26S | [Classified] | Platforms | Coming Soon |
| G26V | [Classified] | Sales | Coming Soon |

### G6X Sub-Platforms
Axon, Hive, OptX, ReVault

### Xperience Mortgage Products
Conventional, FHA, VA, Jumbo, DSCR, Non-QM

### Leadership Team
Tony Grothouse (CEO & Founder), Mike Ryan (CTO), Daryl Schroeder (CIT), Masan Noma (Chief of Staff), Josh Peal (Dir. Capital Markets), Bill Cosby (CCO), Matt Grothouse (VP Sales), Brandon Schoen (VP Sales), Olivia Dunn (CCO & QC)

---

## Live Preview URLs
- **G26x Corporate:** https://g26x-site-mib7ealfh-g6xai.vercel.app
- **Xperience Mortgage:** https://xperience-website-lh0wy9ivg-g6xai.vercel.app
