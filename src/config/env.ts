export type AppEnv = {
  readonly nodeEnv: string;
  readonly port: number;
};

export function loadEnv(): AppEnv {
  return {
    nodeEnv: process.env.NODE_ENV ?? "development",
    port: Number.parseInt(process.env.PORT ?? "3000", 10)
  };
}
