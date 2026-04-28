export type AppEnv = {
  readonly nodeEnv: string;
  readonly port: number;
  readonly mysql: {
    readonly host: string;
    readonly port: number;
    readonly user: string;
    readonly password: string;
    readonly database: string;
    readonly connectTimeoutMs: number;
    readonly dryRunOnBoot: boolean;
  };
};

function parseNumber(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function parseBoolean(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined) {
    return fallback;
  }

  return value.toLowerCase() === "true";
}

export function loadEnv(): AppEnv {
  return {
    nodeEnv: process.env.NODE_ENV ?? "development",
    port: parseNumber(process.env.PORT, 3000),
    mysql: {
      host: process.env.MYSQL_HOST ?? "127.0.0.1",
      port: parseNumber(process.env.MYSQL_PORT, 3306),
      user: process.env.MYSQL_USER ?? "root",
      password: process.env.MYSQL_PASSWORD ?? "",
      database: process.env.MYSQL_DATABASE ?? "nsfw_wtn",
      connectTimeoutMs: parseNumber(process.env.MYSQL_CONNECT_TIMEOUT_MS, 5000),
      dryRunOnBoot: parseBoolean(process.env.MYSQL_DRYRUN_ON_BOOT, true)
    }
  };
}
