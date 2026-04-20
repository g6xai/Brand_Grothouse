# Grothouse Product System

> Brand is *how it looks*. Product is *what it does, how it flows, and how it speaks*. This spec defines product-level behavior per archetype, so entities differentiate on more than color.

## The inheritance chain

```
base kit (tokens + radiance CSS)
   ↓
archetype (IA, layout, motion, components, voice)  ← this doc
   ↓
entity (color accent, specific copy, photography, unique flair)
   ↓
page/screen (final layout choices)
```

Every entity inherits from one of **8 archetypes**. The archetype decides:
- Information architecture (which pages exist)
- Navigation style (editorial, dense-utility, command-bar, image-forward, etc.)
- Hero type (statement, split, terminal, full-bleed-photo, centered, asymmetric)
- Density (spacing scalar — financial dense, charitable airy)
- Motion scalar (0.6 for financial, 1.3 for AI/tech)
- Component vocabulary (which showcase/metric/testimonial pattern to use)
- Voice (vocabulary, tense, sentence length, CTA phrasing)

All of this lives in `kit/archetypes.json` as the machine-readable source of truth.

## The 8 archetypes

### 1. `holding` — The parent / family brand
**Feel:** authoritative, editorial, generational
**Pages:** home · family · portfolio · stewardship · insights · contact
**Hero:** Statement-with-photo (serif display, cobalt italic accent word, single photo)
**Rhythm:** Spacious, generous whitespace
**Motion:** Baseline (1.0)
**Voice:** Timeless present. Words like *stewardship, generational, discipline, purpose, legacy.*
**CTA:** "Learn More" · "Meet the Family"

### 2. `financial` — Capital-allocation, advisory
**Feel:** disciplined, precise, data-forward
**Pages:** home · solutions · research · performance · disclosures · contact
**Hero:** Split (copy left, data card right with live metrics)
**Rhythm:** Tight, information-dense (density 1.3×)
**Motion:** Reduced (0.6×) — calm, not flashy
**Voice:** Short declarative. Words like *basis points, allocation, fiduciary.*
**CTA:** "Request Prospectus" · "View Details"
**Required:** Disclosure footer, compliance links, performance disclaimers

### 3. `real_estate` — Property, development
**Feel:** grounded, enduring, photographic
**Pages:** home · portfolio · investment · team · press · contact
**Hero:** Full-bleed photograph with asymmetric text overlay
**Rhythm:** Cinematic (density 0.85×, wide max-width 1400px)
**Motion:** Gentle slide-up transitions (0.75×)
**Voice:** Narrative past + present. Words like *acquired, located, completed, enduring.*
**CTA:** "View Portfolio" · "Explore Property"
**Required:** High-resolution photography, property location/size/year

### 4. `ai_tech` — AI, software, data platforms
**Feel:** electric, terminal-grade, momentum-forward
**Pages:** home · product · research · changelog · docs · contact
**Hero:** Terminal/code block with floating orbs (asymmetric mega-type)
**Rhythm:** Tight, dense (1.15×)
**Motion:** Cranked (1.3×) — live counters, typing effects, orb drift
**Voice:** Active continuous. Words like *inference, throughput, agentic, signal.*
**CTA:** "Start Building" · "Get Started →"
**Required:** Code sample, changelog entry, docs link

### 5. `charitable` — Foundation, impact
**Feel:** serene, purposeful, evidence-based
**Pages:** home · mission · programs · impact · apply · donate
**Hero:** Centered mission statement (no photo, text does the work)
**Rhythm:** Spacious, airy (0.9×, narrow 1040px max)
**Motion:** Gentle fade (0.7×)
**Voice:** Reflective present. Words like *because, families, generations, sustained.*
**CTA:** "See Our Impact" · "Learn More"
**Required:** Impact numbers, beneficiary stories, grant process

### 6. `consumer` — Direct-to-consumer products
**Feel:** warm, approachable, benefit-forward
**Pages:** home · how-it-works · pricing · reviews · faq · get-started
**Hero:** Split — benefit + lifestyle visual
**Rhythm:** Moderate (1.0×)
**Motion:** Friendly (1.1×)
**Voice:** Second-person. *You, simple, faster, confident, here.*
**CTA:** "Get Started"
**Required:** 3-step process, social proof, pricing or "Free to try"

### 7. `platform` — B2B infrastructure, tooling
**Feel:** systemic, toolkit-oriented, API-aware
**Pages:** home · platform · integrations · pricing · docs · contact
**Hero:** Split — capability copy + code snippet
**Rhythm:** Moderate-dense (1.1×)
**Motion:** Baseline (1.0×)
**Voice:** Active present. Words like *pipeline, integrate, orchestrate, at scale.*
**CTA:** "Request Demo"
**Required:** Integration logos, throughput metrics, docs link

### 8. `consulting` — Strategic advisory
**Feel:** sharp, strategic, case-led
**Pages:** home · practices · case-studies · team · insights · contact
**Hero:** Classic statement (strategic positioning)
**Rhythm:** Moderate (1.05×)
**Motion:** Slightly restrained (0.9×)
**Voice:** Results-oriented. *Engagement, outcome, strategy, diligence, mandate.*
**CTA:** "Start a Project"
**Required:** Case study grid, named practices, office locations

## Shared product primitives

Every entity, regardless of archetype, exposes:
- **Entity badge** — ticker + archetype label (mono, 10px, 0.28em letter-spacing)
- **Family breadcrumb** — small "A Grothouse Family company" tag in header or footer
- **Cross-entity footer** — lists sibling entities with their accents

## Voice modulation rules

Per-archetype vocabulary is listed in `archetypes.json > voice`. When Claude Code writes copy for an entity:

1. Start from Grothouse Family's master voice (timeless, disciplined, purposeful)
2. Modulate by archetype vocabulary + sentence length
3. Never cross archetypes — financial copy should never read like AI/tech copy

Example — same concept, three voices:

- **Holding:** "Built to endure across generations."
- **Financial:** "Risk-adjusted returns. Long-duration capital."
- **AI/Tech:** "Agentic systems. Production-grade inference."

## Component swaps by archetype

Any hero/section component exists in multiple archetypal forms. Pick by archetype:

| Component      | holding            | financial         | real_estate       | ai_tech           | charitable         |
|----------------|--------------------|-------------------|-------------------|-------------------|--------------------|
| Hero           | statement-with-photo | split-with-data-card | full-bleed-photo  | terminal-with-orbs | mission-centered   |
| Showcase       | portfolio-grid-3   | data-table        | property-masonry  | capability-grid   | impact-stories     |
| Metric         | oversized-serif    | mono-numeric-grid | paired-with-photo | live-counter      | oversized-w-label  |
| Testimonial    | pull-quote         | logo-strip        | principal-quote   | customer-logos    | beneficiary-story  |
| Form           | editorial-stacked  | inline-compact    | inquiry-concierge | waitlist          | grant-application  |

## How to use this in Claude Code

When scaffolding a new entity site:

1. Look up the entity in `kit/tokens.json` → get its `archetype`
2. Read `kit/archetypes.json[archetype]` → get IA, layout, components, voice
3. Read the archetype section above for the written description
4. Build pages in the order listed under `ia.pages`
5. Use the component pattern for that archetype from the table above
6. Write copy using the archetype's voice vocabulary
7. Apply brand layer (radiance primitives + entity accent) last — always the same

## What's NOT archetype-specific (always identical)

- Type stack (Source Serif 4 / Outfit / JetBrains Mono)
- Radiance primitives (aurora, orbs, noise, glow, grid)
- Button primitives, divider primitives, card base
- Color palette (all blue-family, from tokens.json)
- Entity badge format (ticker + archetype label)

This keeps the family **visually coherent** while letting each entity feel like its own product.
