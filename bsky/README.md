# BlueSky NSFW Integration (`/bsky`)

This folder contains the BlueSky-first integration for the NSFW scoring platform.

## Goal

Provide ingestion and enrichment for BlueSky content so downstream systems can:
- query NSFW scores,
- filter unsafe content in custom feed generators,
- support moderation workflows with score- and policy-based decisions.

## Intended responsibilities

- BlueSky event/content intake and normalization.
- BlueSky user catalog management with unique atproto DID/handle mappings and handle change history.
- Submission of candidate content to the NSFW scoring API.
- Optional caching and persistence of scoring metadata.
- API endpoints or adapters specific to BlueSky use cases.

## Notes

This is intentionally minimal in the initial phase; architecture and implementation details are tracked in repository-level docs:
- [../ARCHITECTURE.md](../ARCHITECTURE.md)
- [../ROADMAP.md](../ROADMAP.md)
- [../LLM_HINTS.md](../LLM_HINTS.md)

## Vision additions

- The BlueSky user catalog is the identity basis of the scoring process.
- Scoring decisions will be enriched using atproto moderation lists and user lists linked through this catalog.
