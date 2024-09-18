import { CreateUseCase } from "@/domain/use-cases/gym/create.js";
import { DbGymRepository } from "@/infra/database/prisma/db-gym-repository.js";
import { GymValidatorAdapter } from "@/infra/validations/gym-validator-adapter.js";
import { CreateController } from "./create.js";

export function CreateControllerFactory() {
  const gymRepository = new DbGymRepository();
  const createUseCase = new CreateUseCase(gymRepository);
  const gymValidator = new GymValidatorAdapter();
  const createController = new CreateController(gymValidator, createUseCase);

  return createController;
}
