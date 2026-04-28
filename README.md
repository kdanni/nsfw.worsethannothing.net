# nsfw.worsethannothing.net

`nsfw.worsethannothing.net` is a multi-platform moderation infrastructure project focused on **NSFW risk scoring as an API**.

The project is intended to support:
- social media ingestion and monitoring,
- custom feed generators,
- moderation pipelines and tools,
- platform-specific integrations (starting with BlueSky).

## Current status

This repository currently contains:
- initial project-level documentation,
- BlueSky-specific module scaffold in `/bsky`,
- a minimal TypeScript/Node.js API skeleton,
- a bootstrap scoring module aligned to the Phase 1 MVP API roadmap.
- a score persistence port with an in-memory adapter to preserve write/read service boundaries before MySQL integration.
- an in-memory atproto user catalog module for DID/handle mapping and handle history tracking.

## API (current incremental baseline)

### `GET /health`
Service health payload:
- `status`
- `service`
- `timestamp`

### `POST /v1/score`
Synchronous scoring endpoint with module-level validation and a deterministic bootstrap heuristic.

Request body:

```json
{
  "content": "text to evaluate",
  "source": {
    "platform": "bsky",
    "contentId": "at://did:plc:example/post/123"
  }
}
```

Response shape:

```json
{
  "score": 0.75,
  "decision": "review",
  "model": {
    "id": "heuristic.bootstrap",
    "version": "0.1.0"
  },
  "metadata": {
    "scoredAt": "2026-04-24T00:00:00.000Z",
    "source": {
      "platform": "bsky",
      "contentId": "at://did:plc:example/post/123"
    }
  }
}
```

> Note: this is a temporary implementation used to stabilize API contracts and service boundaries before concrete MySQL/Redis/model-provider integrations. The score module now uses a persistence port with an in-memory adapter as the contract baseline.

### `PUT /v1/bsky/users`
Upsert an atproto user catalog entry with unique DID/handle mapping and automatic handle change history tracking.

Request body:

```json
{
  "did": "did:plc:aliceexample",
  "handle": "alice.bsky.social"
}
```

### `GET /v1/bsky/users/known?did=...` or `?handle=...`
Checks whether a BlueSky/atproto user is known to the catalog.

## Local development

Requirements:
- Node.js 20+

Commands:

```bash
npm install
npm run dev
```

Build and run compiled output:

```bash
npm run build
npm start
```

## Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md): system architecture, runtime and infra decisions.
- [ROADMAP.md](./ROADMAP.md): phased delivery plan and milestones.
- [LLM_HINTS.md](./LLM_HINTS.md): implementation and contribution guidance for humans and coding assistants.
- [bsky/README.md](./bsky/README.md): BlueSky module scope and API intent.

## Scope (v1)

- Expose a service API to return NSFW risk scoring for content.
- Prioritize BlueSky as first supported platform.
- Provide a stable foundation for future platform adapters.

## License

See [LICENSE](./LICENSE).
