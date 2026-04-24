# Architecture

## Mission

Provide a reliable API for NSFW scoring that can be used by moderation tools and custom social feeds.

## Initial platform focus

- **Primary adapter**: BlueSky (`/bsky`)
- Design all service boundaries so additional platforms can be added without breaking existing API consumers.

## Runtime preference

Preferred implementation options:

1. **Node.js LTS platform** (recommended for rapid API development and ecosystem fit), or
2. **Standalone binary service** (Go preferred) for minimal runtime dependencies and simpler deployment artifacts.

Decision criteria:
- team familiarity,
- deployment model,
- performance requirements under projected traffic,
- operational simplicity.

## High-level components

1. **API Gateway / HTTP API layer**
   - Exposes versioned scoring endpoints.
   - Handles authentication, authorization, and request validation.

2. **Platform Adapter (BlueSky first)**
   - Normalizes platform-specific payloads into internal content representation.
   - Manages ingestion hooks and retries.

3. **Scoring Orchestrator**
   - Routes content to scoring engine(s).
   - Applies model selection and score normalization rules.

4. **Policy Engine**
   - Converts raw score outputs to moderation decisions (allow/review/block/etc.).
   - Supports configurable thresholds per tenant/use case.

5. **Persistence Layer**
   - **MySQL 8** as primary system of record.
   - Stores content metadata, score records, policy decisions, and audit events.

6. **Cache / transient state layer**
   - **Redis (free-tier is sufficient initially)** for:
     - response caching,
     - deduplication keys,
     - short-lived work coordination.

## Data storage strategy

- MySQL 8 tables should separate mutable content metadata from immutable scoring history.
- Use indexed lookup paths by platform content ID and tenant/application context.
- Keep auditability: decisions should reference exact scoring records and model versions.

## API contract principles

- Version every public endpoint (`/v1`).
- Return both score and decision when available.
- Include metadata fields:
  - model identifier/version,
  - scoring timestamp,
  - confidence or calibration information.

## Reliability and operations

- Idempotent write patterns for ingest and score recording.
- Graceful degradation when external model providers are unavailable.
- Structured logging with request correlation IDs.
- Basic SLO targets for p95 latency and scoring success rate.

## Security and compliance basics

- Minimize retention of raw user-generated content where possible.
- Encrypt data in transit and at rest.
- Enforce least-privilege DB and cache credentials.
- Maintain moderation decision audit trails.
