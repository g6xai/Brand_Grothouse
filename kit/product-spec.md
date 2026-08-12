# Grothouse Product System

> Brand is *how it looks*. Product is *what it does, how it flows, and how it
> speaks*. Under Apple HIG **how it looks is now identical across every
> entity** — so this document covers only what survives that: information
> architecture, voice, and the content each kind of entity must carry.

**Canonical standard:** `c:/Users/tony.grothouse/code/DriveX/design/APPLE-HIG-STANDARD.md`
**This repo's deltas:** [`docs/APPLE-HIG-STANDARD.md`](../docs/APPLE-HIG-STANDARD.md)

## What changed

The previous version of this document differentiated entities on **density
scalars, motion scalars, hero treatments and component vocabularies** keyed to
eight archetypes. All of that is retired.

| Was | Now |
|---|---|
| Density 0.85× – 1.3× per archetype | One 8pt grid, seven values |
| Motion 0.6× – 1.3× per archetype | 150 / 250 / 350ms for every entity |
| Hero "terminal-with-orbs", "full-bleed" | One type ramp, one card, one button |
| Per-archetype component swaps | One component set |
| `kit/archetypes.json` as machine source | **Deleted** — it drove visual differentiation that no longer exists |
| Entity badge in mono at 0.28em tracking | Sentence-case caption, 13px |
| Type stack: serif / sans / mono | One system family |

**Entities now differentiate on colour accent, copy, photography and
information architecture. Not on visual form.**

The `group` field in `tokens.json` is what remains of the archetype axis. It is
**taxonomy only and has no visual consequence** — it selects the IA and voice
below, nothing else.

## The inheritance chain

```
Apple HIG (canonical standard)     ← visual form, identical everywhere
   ↓
kit/tokens.json                    ← two accents, one type ramp, one motion scale
   ↓
group (IA + voice)                 ← this document
   ↓
entity (accent choice, copy, photography)
   ↓
page (content and layout choices)
```

## Groups — IA, voice, and required content

Visual form is omitted from every entry below, because it no longer varies.

### `holding` — parent / family brand
**Pages:** home · family · portfolio · stewardship · insights · contact
**Voice:** Timeless present. *Stewardship, generational, discipline, purpose, legacy.*
**CTA:** "Learn more" · "Meet the family"

### `financial` — capital allocation, advisory
**Pages:** home · solutions · research · performance · disclosures · contact
**Voice:** Short declarative. *Basis points, allocation, fiduciary.*
**CTA:** "Request prospectus" · "View details"
**Required:** Disclosure footer, compliance links, performance disclaimers

### `real-estate` — property, development
**Pages:** home · portfolio · investment · team · press · contact
**Voice:** Narrative past and present. *Acquired, located, completed, enduring.*
**CTA:** "View portfolio" · "Explore property"
**Required:** High-resolution photography; property location, size and year

### `ai-tech` — AI, software, data platforms
**Pages:** home · product · research · changelog · docs · contact
**Voice:** Active continuous. *Inference, throughput, agentic, signal.*
**CTA:** "Start building" · "Get started"
**Required:** Code sample, changelog entry, docs link

### `charitable` — foundation, impact
**Pages:** home · mission · programs · impact · apply · donate
**Voice:** Reflective present. *Because, families, generations, sustained.*
**CTA:** "See our impact" · "Learn more"
**Required:** Impact numbers, beneficiary stories, grant process

### `consumer` — direct-to-consumer
**Pages:** home · how-it-works · pricing · reviews · faq · get-started
**Voice:** Second person. *You, simple, faster, confident, here.*
**CTA:** "Get started"
**Required:** Three-step process, social proof, pricing or "free to try"
**Accent:** teal — this is the group the colour law sends to Xperience Teal

### `platform` — B2B infrastructure, tooling
**Pages:** home · platform · integrations · pricing · docs · contact
**Voice:** Active present. *Pipeline, integrate, orchestrate, at scale.*
**CTA:** "Request demo"
**Required:** Integration logos, throughput metrics, docs link

### `consulting` — strategic advisory
**Pages:** home · practices · case-studies · team · insights · contact
**Voice:** Results-oriented. *Engagement, outcome, strategy, diligence, mandate.*
**CTA:** "Start a project"
**Required:** Case study grid, named practices, office locations

## Voice modulation

1. Start from the Grothouse Family master voice — timeless, disciplined, purposeful.
2. Modulate by the group's vocabulary and sentence length.
3. Never cross groups: financial copy should not read like AI/tech copy.

Same concept, three voices:

- **Holding:** "Built to endure across generations."
- **Financial:** "Risk-adjusted returns. Long-duration capital."
- **AI/tech:** "Agentic systems. Production-grade inference."

**Sentence case in the UI regardless of voice.** Measured on apple.com: zero
uppercase-transformed elements. Voice governs word choice, not letterforms.

## Shared product primitives

Every entity exposes:

- **Entity badge** — ticker plus group label, as a 13px sentence-case caption.
  Never mono, never uppercase, never tracked.
- **Family breadcrumb** — "A Grothouse Family company" in the header or footer.
- **Cross-entity footer** — sibling entities. All render in the *current*
  surface's accent; a footer is not a place to show twenty-four colours.

## Scaffolding a new entity site

1. Look up the entity in `kit/tokens.json` → get its `group` and `accent`.
2. Read the group section above → IA, voice, required content.
3. Set `data-entity`, `data-accent` and `data-theme` on `<html>`.
4. Build pages in the order listed under **Pages**.
5. Write copy in the group's voice.
6. Use the one component set — `hig-*` classes or the React primitives.

There is no step where you pick a hero treatment, a density scalar or a motion
speed. That was the old step 7, and it is gone.

## What is always identical

- Type: one system family, 34 / 28 / 22 / 17 / 13, floor 12px, sentence case
- Radius: 12 control, 16 card, pill buttons
- Motion: 150 / 250 / 350ms, one easing, reduced-motion zeroed
- Space: 8pt grid, seven values
- Depth: translucency and backdrop blur, surface-tone steps — never glow
- Colour: black, white, grey, and one accent per surface

**Exempt: logos and taglines.** Nothing else.
