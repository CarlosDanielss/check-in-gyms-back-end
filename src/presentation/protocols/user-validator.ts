import { User } from "@/domain/models/user.js";

export type UserValidatorAuthenticate = Pick<User, "email" | "password">;

export type UserValidatorProfileRecovery = { id: string };

export type UserValidatorUpdate = Pick<User, "id"> &
  Partial<Pick<User, "name" | "email">>;

export type UserValidatorRegister = Pick<User, "name" | "email" | "password">;

export interface UserValidator {
  authenticate(user: UserValidatorAuthenticate): UserValidatorAuthenticate;
  profileRecovery(
    id: UserValidatorProfileRecovery
  ): UserValidatorProfileRecovery;
  update(user: UserValidatorUpdate): UserValidatorUpdate;
  register(user: UserValidatorRegister): UserValidatorRegister;
}
