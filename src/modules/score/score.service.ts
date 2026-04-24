import type { ScoreRequest, ScoreResponse } from "./score.types.js";

const MODEL_ID = "heuristic.bootstrap";
const MODEL_VERSION = "0.1.0";

export class ScoreService {
  score(request: ScoreRequest): ScoreResponse {
    // Bootstrap heuristic only: deterministic placeholder until model integrations land.
    const normalizedScore = this.deriveScore(request.content);

    return {
      score: normalizedScore,
      decision: this.toDecision(normalizedScore),
      model: {
        id: MODEL_ID,
        version: MODEL_VERSION
      },
      metadata: {
        scoredAt: new Date().toISOString(),
        source: request.source
      }
    };
  }

  private deriveScore(content: string): number {
    const lowered = content.toLowerCase();

    const highRiskSignals = ["nsfw", "explicit", "nude"];
    const mediumRiskSignals = ["adult", "suggestive", "18+"];

    let score = 0.05;

    if (highRiskSignals.some((signal) => lowered.includes(signal))) {
      score += 0.7;
    }

    if (mediumRiskSignals.some((signal) => lowered.includes(signal))) {
      score += 0.2;
    }

    if (content.length > 500) {
      score += 0.05;
    }

    return Math.min(0.99, Number(score.toFixed(2)));
  }

  private toDecision(score: number): ScoreResponse["decision"] {
    if (score >= 0.8) {
      return "block";
    }

    if (score >= 0.5) {
      return "review";
    }

    return "allow";
  }
}
