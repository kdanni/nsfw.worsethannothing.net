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
- BlueSky-specific module scaffold in `/bsky`.

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
