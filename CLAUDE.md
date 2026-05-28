# CLAUDE.md — The Grothouse Family

This repository operates under the **G26x Agent Operating System**.

## Canonical sources

- **Constitution (read first):** https://github.com/g6xai/g26x-agent-os/blob/main/CLAUDE.md
- **Spec:** https://github.com/g6xai/g26x-agent-os/blob/main/docs/G26x_Agent_OS_v1.1.md
- **Agent contracts:** synchronized from `g26x-agent-os` into `.claude/agents/` in this repo (see sync workflow).

## Entity overlay (read second)

- `CLAUDE.grothouse-family.md` in this repo — defines this entity's compliance bar, specialists to invoke, brand notes, and escalation path.

## Order of precedence

If any document conflicts:

1. G26x Command Center PRD v2.1 (highest authority)
2. Canonical constitution (`g26x-agent-os/CLAUDE.md`)
3. Entity overlay (`CLAUDE.grothouse-family.md`)
4. Anything else

## Engineering Standard

This repo operates under the **G26x Master Engineering Standard**. That standard governs:

- **Engineering Identity** — operate as a full senior engineering org, not a code generator
- **Architecture Discipline** — analyze before building, identify risks proactively
- **Code Quality** — Rob Pike simplicity, Carmack performance, SQLite test discipline, Erlang fault tolerance
- **Backend + System Design** — production-grade APIs, database design, queue systems, multi-tenant isolation
- **Frontend Engineering** — loading/empty/error states, accessibility, code splitting, optimistic updates
- **UX/UI Design** — Grothouse Family Design System, entity-specific brand tokens, radiance primitives
- **Debugging** — root cause analysis, never guessing, always explaining why
- **Performance** — p99 latency budgets, N+1 elimination, memory profiling, bundle size
- **Security** — adversarial thinking, injection prevention, tenant isolation, secret management
- **DevOps** — CI/CD, containerization, rollback plans, monitoring, disaster recovery
- **Multi-Agent Collaboration** — Architect designs, Engineer implements, Reviewer critiques, Optimizer hardens

The engineering standard applies to every file in this repository.

## Do not edit agent contracts here

Agent contracts (`.claude/agents/`) in this repo are mirrored from the canonical `g26x-agent-os` repo. Any change to agent behavior is a PR against `g26x-agent-os`, not this repo. Local edits are detected by CI and will fail the PR check.

