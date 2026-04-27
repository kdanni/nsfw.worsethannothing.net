import { createHash } from "node:crypto";

import type { ScoreRequest, ScoreResponse } from "./score.types.js";

export type ScoreRecord = {
  contentHash: string;
  request: ScoreRequest;
  response: ScoreResponse;
  createdAt: string;
};

export interface ScorePersistencePort {
  findLatestByContentHash(contentHash: string): ScoreRecord | null;
  save(record: ScoreRecord): void;
}

export class InMemoryScorePersistenceAdapter implements ScorePersistencePort {
  private readonly recordsByHash = new Map<string, ScoreRecord>();

  findLatestByContentHash(contentHash: string): ScoreRecord | null {
    return this.recordsByHash.get(contentHash) ?? null;
  }

  save(record: ScoreRecord): void {
    this.recordsByHash.set(record.contentHash, record);
  }
}

export function toContentHash(content: string): string {
  return createHash("sha256").update(content.trim().toLowerCase()).digest("hex");
}
