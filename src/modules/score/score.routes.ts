import { Router } from "express";

import { ScoreController } from "./score.controller.js";
import { InMemoryScorePersistenceAdapter } from "./score.persistence.js";
import { ScoreService } from "./score.service.js";
import { ScoreValidationService } from "./score.validation.js";

export function createScoreRouter(): Router {
  const router = Router();

  const persistenceAdapter = new InMemoryScorePersistenceAdapter();
  const scoreController = new ScoreController(
    new ScoreService(persistenceAdapter),
    new ScoreValidationService()
  );

  router.post("/v1/score", (req, res) => {
    scoreController.createScore(req, res);
  });

  return router;
}
