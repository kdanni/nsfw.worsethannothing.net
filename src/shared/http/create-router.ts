import { Router } from "express";

import { createAtprotoUserCatalogRouter } from "../../modules/bsky-users/bsky-users.routes.js";
import { createHealthRouter } from "../../modules/health/health.routes.js";
import { createScoreRouter } from "../../modules/score/score.routes.js";

export function createApiRouter(): Router {
  const router = Router();

  router.use(createHealthRouter());
  router.use(createScoreRouter());
  router.use(createAtprotoUserCatalogRouter());

  return router;
}
