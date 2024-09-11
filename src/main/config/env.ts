import { EnvValidatorAdapter } from "@/infra/validations/env-validator-adapter.js";

const environment = process.env;

const envValidator = new EnvValidatorAdapter();

export const env = envValidator.exec(environment);

