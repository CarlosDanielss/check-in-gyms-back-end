import { EncrypterAdapter } from "@/infra/criptography/encrypter-adapter.js";
import { DbUserRepository } from "@/infra/database/prisma/db-user-repository.js";
import { RegisterUseCase } from "@/domain/use-cases/user/register.js";
import { UserValidatorAdapter } from "@/infra/validations/user-validator-adapter.js";
import { RegisterController } from "./register.js";

export function registerControllerFactory() {
  const encrypter = new EncrypterAdapter();
  const dbUserRepository = new DbUserRepository();
  const registerUseCase = new RegisterUseCase(encrypter, dbUserRepository);
  const userValidatorAdapter = new UserValidatorAdapter();
  const registerController = new RegisterController(
    userValidatorAdapter,
    registerUseCase
  );

  return registerController;
}
