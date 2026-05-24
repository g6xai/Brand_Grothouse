# CLAUDE.grothouse-family.md — Entity Overlay

# Entity: The Grothouse Family

**Holding:** Parent entity (top of hierarchy)
**Entity operator:** Tony Grothouse
**Escalation path:** Tony
**Tier on AI maturity (per PRD v2.1):** Tier 2

## Mission

The Grothouse Family is the parent holding entity that owns the G26x portfolio. Brand_Grothouse is the canonical brand repository — the single source of truth for design tokens, typography, color palettes, and brand guidelines across all 24 G26x entities.

## Active products / platforms

- Brand_Grothouse design system (tokens, CSS, Tailwind presets)
- Family governance documentation

## Compliance bar

- [x] **Financial controls** — invokes `financial-controls-reviewer`.
- [x] **Tax structure** — invokes `tax-and-financial-reviewer`.

## Specialist invocation rules

| Trigger | Specialist | Authority |
|---|---|---|
| Any brand token change (`kit/tokens.json`, `kit/*.css`, `kit/*.js`) | brand-guardian | veto |
| Any financial or tax document | tax-and-financial-reviewer | gating |
| Any entity brand guideline (`docs/governance/*.md`) | brand-guardian | gating |

## Entity-specific brand notes

- This IS the canonical brand source. All other entities derive from Brand_Grothouse.
- No deviations — this repo defines the defaults.

## Data boundaries

- Tenant ID prefix: `grothouse-family`
- Data this entity may NOT access: individual entity operational data (loans, transactions, user PII)
- Data this entity exports to holding co: consolidated brand compliance reports

## Stack notes

- Static assets (design tokens, CSS, Tailwind presets)
- No runtime application — this is a reference repository
- Consumed by all G26x entity repos via package import or manual sync

## Spend authority

- Spend that agents can draft but not authorize: < $100
- Spend that requires entity operator approval: $100 - $1,000
- Spend that requires Tony approval: > $1,000

## Special notes

- The "2" in G26x represents two generations (Tony + four children). This context appears in brand materials but is not publicly announced.
- Changes to this repo cascade to all 24 entities. Treat every PR as high-impact.
- The Grothouse Family Design System section in the root CLAUDE.md derives from this repo.

---

*Last updated: 2026-05-24. Owner: Tony Grothouse. Approved by: Tony.*
