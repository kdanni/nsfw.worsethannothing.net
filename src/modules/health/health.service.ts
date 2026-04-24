import type { HealthResponse } from "./health.types.js";

export class HealthService {
  getHealth(): HealthResponse {
    return {
      status: "ok",
      service: "nsfw-wtn-api",
      timestamp: new Date().toISOString()
    };
  }
}
