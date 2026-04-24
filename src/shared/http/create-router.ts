import { Router } from "express";

import { createHealthRouter } from "../../modules/health/health.routes.js";
import { createScoreRouter } from "../../modules/score/score.routes.js";

export function createApiRouter(): Router {
  const router = Router();

  router.use(createHealthRouter());
  router.use(createScoreRouter());

  return router;
}
