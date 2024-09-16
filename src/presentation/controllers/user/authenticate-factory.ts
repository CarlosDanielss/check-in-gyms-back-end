import { EncrypterAdapter } from "@/infra/criptography/encrypter-adapter.js";
import { DbUserRepository } from "@/infra/database/prisma/db-user-repository.js";
import { AuthenticateUseCase } from "@/domain/use-cases/user/authenticate.js";
import { UserValidatorAdapter } from "@/infra/validations/user-validator-adapter.js";
import { TokenAdapter } from "@/infra/tokens/token-adapter.js";

import { AuthenticateController } from "./authenticate.js";

import { env } from "@/main/config/env.js";

export function AuthenticateControllerFactory() {
  const encrypter = new EncrypterAdapter();
  const userRepository = new DbUserRepository();
  const authenticateUseCase = new AuthenticateUseCase(
    encrypter,
    userRepository
  );
  const userValidator = new UserValidatorAdapter();
  const token = new TokenAdapter(env.JWT_SECRET);
  const authenticateController = new AuthenticateController(
    userValidator,
    authenticateUseCase,
    token
  );

  return authenticateController;
}
