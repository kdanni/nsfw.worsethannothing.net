import type { Request, Response } from "express";

import { AtprotoUserCatalogService } from "./bsky-users.service.js";
import { AtprotoUserValidationService } from "./bsky-users.validation.js";

export class AtprotoUserCatalogController {
  constructor(
    private readonly userService: AtprotoUserCatalogService,
    private readonly validationService: AtprotoUserValidationService
  ) {}

  upsertUser(req: Request, res: Response): void {
    const validation = this.validationService.validateUpsertRequest(req.body);

    if (!validation.ok) {
      res.status(400).json({
        error: "Invalid request",
        details: validation.errors,
      });
      return;
    }

    try {
      const result = this.userService.upsertUser(validation.value.did, validation.value.handle);
      res.status(result.known ? 200 : 201).json(result);
      return;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown user catalog error";
      res.status(409).json({ error: message });
      return;
    }
  }

  isKnownUser(req: Request, res: Response): void {
    const validation = this.validationService.validateKnownUserQuery(req.query);

    if (!validation.ok) {
      res.status(400).json({
        error: "Invalid query",
        details: validation.errors,
      });
      return;
    }

    const result = this.userService.isKnownUser({
      did: validation.value.did || undefined,
      handle: validation.value.handle || undefined,
    });

    res.status(200).json(result);
  }
}
