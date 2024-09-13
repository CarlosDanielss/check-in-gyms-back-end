import { User } from "@/domain/models/user.js";

export type UserValidatorProfileRecovery = { id: string };

export type UserValidatorUpdate = Pick<User, "id"> &
  Partial<Pick<User, "name" | "email">>;

export type UserValidatorRegister = Pick<User, "name" | "email" | "password">;

export interface UserValidator {
  profileRecovery(
    id: UserValidatorProfileRecovery
  ): UserValidatorProfileRecovery;
  update(user: UserValidatorUpdate): UserValidatorUpdate;
  register(user: UserValidatorRegister): UserValidatorRegister;
}
