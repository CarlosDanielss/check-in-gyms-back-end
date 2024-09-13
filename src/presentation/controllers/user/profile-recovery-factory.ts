import { GetUserProfileUseCase } from "@/domain/use-cases/user/get-user-profile.js";
import { DbUserRepository } from "@/infra/database/prisma/db-user-repository.js";
import { UserValidatorAdapter } from "@/infra/validations/user-validator-adapter.js";
import { ProfileRecoveryController } from "./profile-recovery.js";

export function ProfileRecoveryControllerFactory() {
  const dbUserRepository = new DbUserRepository();
  const getUserProfileUseCase = new GetUserProfileUseCase(dbUserRepository);
  const uservalidatorAdapter = new UserValidatorAdapter();
  const profileRecoveryController = new ProfileRecoveryController(
    uservalidatorAdapter,
    getUserProfileUseCase
  );

  return profileRecoveryController;
}
