import { z } from "zod";

import { env, EnvValidator } from "@/main/protocols/env-validator.js";

export class EnvValidatorAdapter implements EnvValidator {
  exec(environment: NodeJS.ProcessEnv): env {
    const envSchema = z.object({
      NODE_ENV: z
        .enum(["developer", "test", "production"])
        .default("developer"),
      JWT_SECRET: z.string(),
      PORT: z.coerce.number().default(3333),
      DATABASE_URL: z.string(),
    });

    const isValid = envSchema.safeParse(environment);

    if (!isValid.success) {
      console.error("Invalid environment variables", isValid.error.format());

      throw new Error("Invalid environment variables.");
    }

    return isValid.data;
  }
}
