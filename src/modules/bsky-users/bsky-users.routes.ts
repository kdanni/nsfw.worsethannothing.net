import { Router } from "express";

import { AtprotoUserCatalogController } from "./bsky-users.controller.js";
import { InMemoryAtprotoUserCatalogAdapter } from "./bsky-users.persistence.js";
import { AtprotoUserCatalogService } from "./bsky-users.service.js";
import { AtprotoUserValidationService } from "./bsky-users.validation.js";

export function createAtprotoUserCatalogRouter(): Router {
  const router = Router();

  const catalogAdapter = new InMemoryAtprotoUserCatalogAdapter();
  const controller = new AtprotoUserCatalogController(
    new AtprotoUserCatalogService(catalogAdapter),
    new AtprotoUserValidationService()
  );

  router.put("/v1/bsky/users", (req, res) => {
    controller.upsertUser(req, res);
  });

  router.get("/v1/bsky/users/known", (req, res) => {
    controller.isKnownUser(req, res);
  });

  return router;
}
