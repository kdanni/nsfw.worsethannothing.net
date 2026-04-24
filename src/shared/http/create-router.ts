import { Router } from "express";

import { createHealthRouter } from "../../modules/health/health.routes.js";

export function createApiRouter(): Router {
  const router = Router();

  // Skeleton: only health endpoint is exposed for now.
  router.use(createHealthRouter());

  return router;
}
