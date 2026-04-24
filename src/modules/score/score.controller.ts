import type { Request, Response } from "express";

import { ScoreService } from "./score.service.js";
import { ScoreValidationService } from "./score.validation.js";

export class ScoreController {
  constructor(
    private readonly scoreService: ScoreService,
    private readonly scoreValidationService: ScoreValidationService
  ) {}

  createScore(req: Request, res: Response): void {
    const validationResult = this.scoreValidationService.validateScoreRequest(req.body);

    if (!validationResult.ok) {
      res.status(400).json({
        error: "invalid_request",
        message: "Payload validation failed.",
        details: validationResult.errors
      });

      return;
    }

    const result = this.scoreService.score(validationResult.value);

    res.status(200).json(result);
  }
}
