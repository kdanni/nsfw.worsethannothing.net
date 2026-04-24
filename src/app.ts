import express, { type Express } from "express";

import { createApiRouter } from "./shared/http/create-router.js";

export function createApp(): Express {
  const app = express();

  app.use(express.json());
  app.use(createApiRouter());

  return app;
}
