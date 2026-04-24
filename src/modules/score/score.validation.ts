import type { ScoreRequest, ValidationResult } from "./score.types.js";

const MAX_CONTENT_LENGTH = 10_000;

export class ScoreValidationService {
  validateScoreRequest(input: unknown): ValidationResult<ScoreRequest> {
    const errors: string[] = [];

    if (typeof input !== "object" || input === null) {
      return { ok: false, errors: ["Request body must be a JSON object."] };
    }

    const candidate = input as Record<string, unknown>;

    if (typeof candidate.content !== "string") {
      errors.push("'content' is required and must be a string.");
    } else {
      const trimmedContent = candidate.content.trim();

      if (trimmedContent.length === 0) {
        errors.push("'content' must not be empty.");
      }

      if (trimmedContent.length > MAX_CONTENT_LENGTH) {
        errors.push(`'content' must be <= ${MAX_CONTENT_LENGTH} characters.`);
      }
    }

    if (candidate.source !== undefined) {
      if (typeof candidate.source !== "object" || candidate.source === null) {
        errors.push("'source' must be an object when provided.");
      } else {
        const source = candidate.source as Record<string, unknown>;

        if (source.platform !== undefined && typeof source.platform !== "string") {
          errors.push("'source.platform' must be a string when provided.");
        }

        if (source.contentId !== undefined && typeof source.contentId !== "string") {
          errors.push("'source.contentId' must be a string when provided.");
        }
      }
    }

    if (errors.length > 0) {
      return { ok: false, errors };
    }

    return {
      ok: true,
      value: {
        content: (candidate.content as string).trim(),
        source: candidate.source as ScoreRequest["source"]
      }
    };
  }
}
