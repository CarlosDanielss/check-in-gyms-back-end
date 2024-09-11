import { User } from "@/domain/models/user.js";

export type UserValidatorUpdate = Pick<User, "id"> &
  Partial<Pick<User, "name" | "email">>;

export type UserValidatorRegister = Pick<User, "name" | "email" | "password">;

export interface UserValidator {
  update(user: UserValidatorUpdate): UserValidatorUpdate;
  register(user: UserValidatorRegister): UserValidatorRegister;
}
