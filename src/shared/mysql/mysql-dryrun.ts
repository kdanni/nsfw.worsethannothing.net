import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export type MySqlDryRunConfig = {
  readonly host: string;
  readonly port: number;
  readonly user: string;
  readonly password: string;
  readonly database: string;
  readonly connectTimeoutMs: number;
};

export async function runMySqlDryRun(config: MySqlDryRunConfig): Promise<void> {
  const args = [
    `--host=${config.host}`,
    `--port=${config.port}`,
    `--user=${config.user}`,
    `--database=${config.database}`,
    `--connect-timeout=${Math.max(1, Math.floor(config.connectTimeoutMs / 1000))}`,
    "--silent",
    "--skip-column-names",
    "--batch",
    "--execute",
    "SELECT 1;"
  ];

  const env = {
    ...process.env,
    MYSQL_PWD: config.password
  };

  const { stdout } = await execFileAsync("mysql", args, {
    env,
    timeout: config.connectTimeoutMs
  });

  if (stdout.trim() !== "1") {
    throw new Error(`Unexpected MySQL dry-run output: ${stdout.trim() || "<empty>"}`);
  }
}
