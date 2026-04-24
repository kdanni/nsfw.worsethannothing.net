# Roadmap

## Phase 0 — Foundation (current)

- Define architecture and operating model.
- Establish repository documentation and contribution guidance.
- Clarify BlueSky-first implementation boundaries.

## Phase 1 — MVP Scoring API

- Implement `/v1/score` endpoint for synchronous NSFW scoring queries.
- Add request/response schema validation.
- Persist scoring requests and results in MySQL 8.
- Add Redis-backed caching for repeated content hash lookups.
- Deliver minimal authentication (API key or token-based).

## Phase 2 — BlueSky Integration

- Implement BlueSky ingestion adapter in `/bsky`.
- Normalize BlueSky payloads to internal content model.
- Enable policy evaluation for BlueSky content contexts.
- Provide integration examples for feed generators/moderation tools.

## Phase 3 — Policy & Moderation Workflows

- Add configurable threshold policies (allow/review/block).
- Store policy decisions and moderation events.
- Add reviewer-friendly retrieval endpoints (history + rationale metadata).

## Phase 4 — Scale and Hardening

- Add async/batch scoring endpoints.
- Introduce queue-backed processing for burst handling.
- Improve observability (dashboards, alerts, error budgets).
- Formalize SLOs and incident playbooks.

## Phase 5 — Multi-platform Expansion

- Add second social platform adapter.
- Generalize platform adapter interface and docs.
- Validate tenant or multi-project isolation requirements.

## Cross-cutting milestones

- Testing: unit, integration, and contract tests for all public endpoints.
- Security: periodic dependency audits and secrets management hardening.
- Documentation: keep architecture and roadmap aligned with implementation reality.
