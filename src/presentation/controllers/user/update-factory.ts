import { DbUserRepository } from "@/infra/database/prisma/db-user-repository.js";
import { UpdateUseCase } from "@/domain/use-cases/user/update.js";
import { UserValidatorAdapter } from "@/infra/validations/user-validator-adapter.js";
import { UpdateController } from "./update.js";

export function updateControllerFactory() {
  const dbUserRepository = new DbUserRepository();
  const updateUseCase = new UpdateUseCase(dbUserRepository);
  const userValidatorAdapter = new UserValidatorAdapter();
  const updateController = new UpdateController(
    userValidatorAdapter,
    updateUseCase
  );

  return updateController;
}
