import type { Request, Response } from "express";

import { HealthService } from "./health.service.js";

export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  getHealth(_req: Request, res: Response): void {
    res.status(200).json(this.healthService.getHealth());
  }
}
