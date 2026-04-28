import { createApp } from "./app.js";
import { loadEnv } from "./config/env.js";
import { runMySqlDryRun } from "./shared/mysql/mysql-dryrun.js";

async function bootstrap(): Promise<void> {
  const env = loadEnv();

  if (env.mysql.dryRunOnBoot) {
    await runMySqlDryRun(env.mysql);
    // eslint-disable-next-line no-console
    console.log("[bootstrap] MySQL dry-run succeeded (SELECT 1)");
  }

  const app = createApp();

  app.listen(env.port, () => {
    // Intentionally minimal startup output for the skeleton phase.
    // eslint-disable-next-line no-console
    console.log(`[bootstrap] API listening on port ${env.port} (${env.nodeEnv})`);
  });
}

void bootstrap().catch((error: unknown) => {
  // eslint-disable-next-line no-console
  console.error("[bootstrap] startup failed", error);
  process.exitCode = 1;
});
