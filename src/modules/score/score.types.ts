export type ScoreRequest = {
  content: string;
  source?: {
    platform?: string;
    contentId?: string;
  };
};

export type ScoreResponse = {
  score: number;
  decision: "allow" | "review" | "block";
  model: {
    id: string;
    version: string;
  };
  metadata: {
    scoredAt: string;
    source?: {
      platform?: string;
      contentId?: string;
    };
  };
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
