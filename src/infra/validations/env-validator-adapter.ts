import { z } from "zod";

import { env, EnvValidator } from "@/main/protocols/env-validator.js";

export class EnvValidatorAdapter implements EnvValidator {
  exec(environment: NodeJS.ProcessEnv): env {
    const envSchema = z.object({
      NODE_ENV: z.enum(["developer", "test", "production"]),
      JWT_SECRET: z.string(),
      PORT: z.coerce.number().default(3333),
      DATABASE_URL: z.string().url(),
    });

    const validation = envSchema.safeParse(environment);

    if (validation.error) {
      const { path } = validation.error.issues[0];
      const fieldWithError = `Invalid environment variables [${path}]`;

      console.error("Invalid environment variables", validation.error.format());
      throw new Error(fieldWithError);
    }

    return validation.data;
  }
}
