# Roadmap

## Phase 0 — Foundation (current)

- ✅ Define architecture and operating model.
- ✅ Establish repository documentation and contribution guidance.
- ✅ Clarify BlueSky-first implementation boundaries.

## Phase 1 — MVP Scoring API (in progress)

- ✅ Implement initial `/v1/score` endpoint for synchronous NSFW scoring queries (bootstrap heuristic service).
- ✅ Add request/response schema validation (module-local validation service).
- ⏳ Persist scoring requests and results in MySQL 8 (port + in-memory adapter contract completed).
- ⏳ Add Redis-backed caching for repeated content hash lookups.
- ⏳ Deliver minimal authentication (API key or token-based).

### Next incremental target

- Implement a MySQL-backed adapter for the score persistence port, including schema migration and idempotent upsert semantics.

## Phase 2 — BlueSky Integration

- ✅ Implement baseline BlueSky user catalog repository with DID/handle uniqueness, known-user lookup, and handle change history.
- Implement BlueSky ingestion adapter in `/bsky`.
- Normalize BlueSky payloads to internal content model.
- Enable policy evaluation for BlueSky content contexts.
- Provide integration examples for feed generators/moderation tools.

## Phase 3 — Policy & Moderation Workflows

- Add configurable threshold policies (allow/review/block).
- Integrate atproto moderation lists and user lists into the scoring process via the BlueSky user catalog.
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
