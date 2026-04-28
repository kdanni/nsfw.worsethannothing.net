import type {
  AtprotoUserRecord,
  AtprotoUserHistoryEntry,
} from "./bsky-users.types.js";

export interface AtprotoUserCatalogPort {
  findByDid(did: string): AtprotoUserRecord | null;
  findByHandle(handle: string): AtprotoUserRecord | null;
  save(record: AtprotoUserRecord): void;
}

export class InMemoryAtprotoUserCatalogAdapter implements AtprotoUserCatalogPort {
  private readonly recordsByDid = new Map<string, AtprotoUserRecord>();
  private readonly didByCurrentHandle = new Map<string, string>();

  findByDid(did: string): AtprotoUserRecord | null {
    return this.recordsByDid.get(normalizeDid(did)) ?? null;
  }

  findByHandle(handle: string): AtprotoUserRecord | null {
    const normalizedHandle = normalizeHandle(handle);
    const did = this.didByCurrentHandle.get(normalizedHandle);
    if (!did) {
      return null;
    }

    return this.recordsByDid.get(did) ?? null;
  }

  save(record: AtprotoUserRecord): void {
    const normalizedDid = normalizeDid(record.did);
    const normalizedCurrentHandle = normalizeHandle(record.currentHandle);

    const previousRecord = this.recordsByDid.get(normalizedDid);
    if (previousRecord) {
      this.didByCurrentHandle.delete(normalizeHandle(previousRecord.currentHandle));
    }

    this.recordsByDid.set(normalizedDid, {
      ...record,
      did: normalizedDid,
      currentHandle: normalizedCurrentHandle,
      history: dedupeHistoryEntries(record.history),
    });
    this.didByCurrentHandle.set(normalizedCurrentHandle, normalizedDid);
  }
}

function dedupeHistoryEntries(entries: AtprotoUserHistoryEntry[]): AtprotoUserHistoryEntry[] {
  const byHandle = new Map<string, AtprotoUserHistoryEntry>();

  for (const entry of entries) {
    const normalizedHandle = normalizeHandle(entry.handle);
    const existing = byHandle.get(normalizedHandle);

    if (!existing) {
      byHandle.set(normalizedHandle, {
        ...entry,
        handle: normalizedHandle,
      });
      continue;
    }

    byHandle.set(normalizedHandle, {
      handle: normalizedHandle,
      firstSeenAt:
        existing.firstSeenAt < entry.firstSeenAt
          ? existing.firstSeenAt
          : entry.firstSeenAt,
      lastSeenAt:
        existing.lastSeenAt > entry.lastSeenAt ? existing.lastSeenAt : entry.lastSeenAt,
    });
  }

  return [...byHandle.values()].sort((a, b) => a.firstSeenAt.localeCompare(b.firstSeenAt));
}

export function normalizeDid(did: string): string {
  return did.trim().toLowerCase();
}

export function normalizeHandle(handle: string): string {
  return handle.trim().toLowerCase();
}
