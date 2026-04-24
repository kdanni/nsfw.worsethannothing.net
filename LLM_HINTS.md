# LLM Hints

This document provides practical guidance for contributors and coding assistants working on this repository.

## Product intent

Build a platform-agnostic NSFW scoring API with BlueSky as the first integration target.

## Core principles

1. **Safety first**: false negatives are usually more costly than false positives in moderation contexts.
2. **Deterministic contracts**: public request/response schemas should be explicit, versioned, and stable.
3. **Composable architecture**: platform adapters should be isolated from scoring engines and policy logic.
4. **Operational simplicity**: prefer infrastructure that can run cheaply and reliably in small environments.

## Engineering guidelines

- Keep platform-specific code under dedicated module directories (e.g., `/bsky`).
- Define clear boundaries between:
  - ingestion,
  - scoring orchestration,
  - policy evaluation,
  - API presentation.
- Persist canonical entities in MySQL 8.
- Use Redis as a cache/queue assist layer where latency or burst smoothing matters.
- Build for idempotency in ingestion and scoring jobs.

## API guidance

- Start with synchronous scoring query endpoints for simple adoption.
- Add async/batch processing endpoints after baseline reliability is established.
- Include score confidence and model metadata in responses whenever possible.
- Keep endpoint naming resource-oriented and versioned (`/v1/...`).

## Data model hints (initial)

Suggested top-level entities:
- `platform_account`
- `content_item`
- `score_result`
- `policy_decision`
- `moderation_event`

Use immutable score records and append-only decision/event logs for traceability.

## Non-goals for initial phase

- Full multi-platform support in first release.
- Real-time stream processing complexity before baseline API reliability.
- Over-optimizing model serving before usage patterns are known.
