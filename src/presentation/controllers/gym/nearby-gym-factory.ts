import { NearbyGymUseCase } from "@/domain/use-cases/gym/nearby-gym.js";
import { DbGymRepository } from "@/infra/database/prisma/db-gym-repository.js";
import { GymValidatorAdapter } from "@/infra/validations/gym-validator-adapter.js";
import { NearbyGymController } from "./nearby-gym.js";

export function NearbyGymControllerFactory() {
  const gymRepository = new DbGymRepository();
  const nearbyGymUseCase = new NearbyGymUseCase(gymRepository);
  const gymValidator = new GymValidatorAdapter();
  const nearbyGymController = new NearbyGymController(
    gymValidator,
    nearbyGymUseCase
  );

  return nearbyGymController;
}
