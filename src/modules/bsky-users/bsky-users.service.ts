import {
  normalizeDid,
  normalizeHandle,
  type AtprotoUserCatalogPort,
} from "./bsky-users.persistence.js";
import type {
  AtprotoUserRecord,
  AtprotoUserUpsertResponse,
  KnownUserResponse,
} from "./bsky-users.types.js";

export class AtprotoUserCatalogService {
  constructor(private readonly userCatalog: AtprotoUserCatalogPort) {}

  upsertUser(did: string, handle: string): AtprotoUserUpsertResponse {
    const normalizedDid = normalizeDid(did);
    const normalizedHandle = normalizeHandle(handle);

    const existingByDid = this.userCatalog.findByDid(normalizedDid);
    const existingByHandle = this.userCatalog.findByHandle(normalizedHandle);

    if (existingByHandle && existingByHandle.did !== normalizedDid) {
      throw new Error(
        `Handle '${normalizedHandle}' is already mapped to a different atproto DID.`
      );
    }

    if (!existingByDid) {
      const now = new Date().toISOString();
      const created: AtprotoUserRecord = {
        did: normalizedDid,
        currentHandle: normalizedHandle,
        history: [
          {
            handle: normalizedHandle,
            firstSeenAt: now,
            lastSeenAt: now,
          },
        ],
        createdAt: now,
        updatedAt: now,
      };

      this.userCatalog.save(created);

      return {
        user: created,
        known: false,
        changedHandle: false,
      };
    }

    const now = new Date().toISOString();
    const changedHandle = existingByDid.currentHandle !== normalizedHandle;

    const updatedHistory = [...existingByDid.history];
    const existingHandleHistoryIndex = updatedHistory.findIndex(
      (entry) => entry.handle === normalizedHandle
    );

    if (existingHandleHistoryIndex >= 0) {
      const existingEntry = updatedHistory[existingHandleHistoryIndex];
      updatedHistory[existingHandleHistoryIndex] = {
        ...existingEntry,
        lastSeenAt: now,
      };
    } else {
      updatedHistory.push({
        handle: normalizedHandle,
        firstSeenAt: now,
        lastSeenAt: now,
      });
    }

    const updated: AtprotoUserRecord = {
      ...existingByDid,
      currentHandle: normalizedHandle,
      history: updatedHistory,
      updatedAt: now,
    };

    this.userCatalog.save(updated);

    return {
      user: updated,
      known: true,
      changedHandle,
    };
  }

  isKnownUser(query: { did?: string; handle?: string }): KnownUserResponse {
    const candidateByDid = query.did ? this.userCatalog.findByDid(query.did) : null;
    if (candidateByDid) {
      return {
        known: true,
        user: candidateByDid,
      };
    }

    const candidateByHandle = query.handle ? this.userCatalog.findByHandle(query.handle) : null;

    return {
      known: candidateByHandle !== null,
      user: candidateByHandle,
    };
  }
}
