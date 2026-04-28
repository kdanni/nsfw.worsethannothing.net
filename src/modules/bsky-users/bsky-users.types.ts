export type AtprotoUserUpsertRequest = {
  did?: string;
  handle?: string;
};

export type AtprotoUserHistoryEntry = {
  handle: string;
  firstSeenAt: string;
  lastSeenAt: string;
};

export type AtprotoUserRecord = {
  did: string;
  currentHandle: string;
  history: AtprotoUserHistoryEntry[];
  createdAt: string;
  updatedAt: string;
};

export type AtprotoUserUpsertResponse = {
  user: AtprotoUserRecord;
  known: boolean;
  changedHandle: boolean;
};

export type KnownUserQuery = {
  did?: string;
  handle?: string;
};

export type KnownUserResponse = {
  known: boolean;
  user: AtprotoUserRecord | null;
};

export type ValidationResult<T> =
  | {
      ok: true;
      value: T;
    }
  | {
      ok: false;
      errors: string[];
    };
