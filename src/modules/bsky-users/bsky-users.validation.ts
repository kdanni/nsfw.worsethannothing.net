import type {
  AtprotoUserUpsertRequest,
  KnownUserQuery,
  ValidationResult,
} from "./bsky-users.types.js";
import { normalizeDid, normalizeHandle } from "./bsky-users.persistence.js";

export class AtprotoUserValidationService {
  validateUpsertRequest(payload: unknown): ValidationResult<Required<AtprotoUserUpsertRequest>> {
    if (!payload || typeof payload !== "object") {
      return {
        ok: false,
        errors: ["Request body must be a JSON object."],
      };
    }

    const candidate = payload as AtprotoUserUpsertRequest;
    const errors: string[] = [];

    if (!candidate.did || typeof candidate.did !== "string") {
      errors.push("did is required and must be a string.");
    }

    if (!candidate.handle || typeof candidate.handle !== "string") {
      errors.push("handle is required and must be a string.");
    }

    if (errors.length > 0) {
      return { ok: false, errors };
    }

    const did = normalizeDid(candidate.did as string);
    const handle = normalizeHandle(candidate.handle as string);

    if (!did.startsWith("did:")) {
      errors.push("did must start with 'did:'.");
    }

    if (!handle.includes(".")) {
      errors.push("handle must be a valid atproto handle (example: user.bsky.social).");
    }

    if (errors.length > 0) {
      return { ok: false, errors };
    }

    return {
      ok: true,
      value: {
        did,
        handle,
      },
    };
  }

  validateKnownUserQuery(query: unknown): ValidationResult<Required<KnownUserQuery>> {
    if (!query || typeof query !== "object") {
      return {
        ok: false,
        errors: ["Query must include did or handle."],
      };
    }

    const candidate = query as KnownUserQuery;
    const did = candidate.did ? normalizeDid(candidate.did) : "";
    const handle = candidate.handle ? normalizeHandle(candidate.handle) : "";

    if (!did && !handle) {
      return {
        ok: false,
        errors: ["Provide at least one of did or handle."],
      };
    }

    return {
      ok: true,
      value: {
        did,
        handle,
      },
    };
  }
}
