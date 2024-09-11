export interface env {
  NODE_ENV: "developer" | "test" | "production";
  JWT_SECRET: string;
  PORT?: number;
  DATABASE_URL: string;
}

export interface EnvValidator {
  exec(environment: NodeJS.ProcessEnv): env;
}
