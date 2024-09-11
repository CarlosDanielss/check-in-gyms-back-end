import { User } from "@/domain/models/user.js";

export type UserValidatorRegister = Pick<User, "name" | "email" | "password">;

export interface UserValidator {
  register(user: UserValidatorRegister): UserValidatorRegister;
}
