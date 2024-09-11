import { EncrypterAdapter } from "@/infra/criptography/encrypter-adapter.js";
//import { DbUserRepository } from "@/infra/database/prisma/db-user-repository.js";
import { RegisterUseCase } from "@/domain/use-cases/user/register.js";
import { UserValidatorAdapter } from "@/infra/validations/user-validator-adapter.js";
import { RegisterController } from "./register.js";

import { InMemoryUserRepository } from "@/infra/database/in-memory/in-memory-user-repository.js";

export function registerControllerFactory() {
  const encrypter = new EncrypterAdapter();
  const dbUserRepository = new InMemoryUserRepository();
  const registerUseCase = new RegisterUseCase(encrypter, dbUserRepository);
  const userValidatorAdapter = new UserValidatorAdapter();
  const registerController = new RegisterController(
    userValidatorAdapter,
    registerUseCase
  );

  return registerController;
}
