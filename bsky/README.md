# BlueSky NSFW Integration (`/bsky`)

This folder contains the BlueSky-first integration for the NSFW scoring platform.

## Goal

Provide ingestion and enrichment for BlueSky content so downstream systems can:
- query NSFW scores,
- filter unsafe content in custom feed generators,
- support moderation workflows with score- and policy-based decisions.

## Intended responsibilities

- BlueSky event/content intake and normalization.
- Submission of candidate content to the NSFW scoring API.
- Optional caching and persistence of scoring metadata.
- API endpoints or adapters specific to BlueSky use cases.

## Notes

This is intentionally minimal in the initial phase; architecture and implementation details are tracked in repository-level docs:
- [../ARCHITECTURE.md](../ARCHITECTURE.md)
- [../ROADMAP.md](../ROADMAP.md)
- [../LLM_HINTS.md](../LLM_HINTS.md)
