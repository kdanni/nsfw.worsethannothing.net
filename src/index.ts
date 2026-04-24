import { createApp } from "./app.js";
import { loadEnv } from "./config/env.js";

const env = loadEnv();
const app = createApp();

app.listen(env.port, () => {
  // Intentionally minimal startup output for the skeleton phase.
  // eslint-disable-next-line no-console
  console.log(`[bootstrap] API listening on port ${env.port} (${env.nodeEnv})`);
});
