import { User } from "@/domain/models/user.js";

export type UserValidatorRead = { page: number };

export type UserValidatorUpdate = Pick<User, "id"> &
  Partial<Pick<User, "name" | "email">>;

export type UserValidatorRegister = Pick<User, "name" | "email" | "password">;

export interface UserValidator {
  read(page: string): UserValidatorRead;
  update(user: UserValidatorUpdate): UserValidatorUpdate;
  register(user: UserValidatorRegister): UserValidatorRegister;
}
