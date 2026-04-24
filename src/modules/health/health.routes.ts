import { Router } from "express";

import { HealthController } from "./health.controller.js";
import { HealthService } from "./health.service.js";

export function createHealthRouter(): Router {
  const router = Router();
  const healthController = new HealthController(new HealthService());

  router.get("/health", (req, res) => {
    healthController.getHealth(req, res);
  });

  return router;
}
