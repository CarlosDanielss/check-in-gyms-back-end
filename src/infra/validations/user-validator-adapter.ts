import { z } from "zod";

import {
  UserValidator,
  UserValidatorRegister,
} from "@/presentation/protocols/user-validator.js";

import { InvalidCredentialsError } from "@/domain/erros/invalid-credentials-error.js";

export class UserValidatorAdapter implements UserValidator {
  register({
    name,
    email,
    password,
  }: UserValidatorRegister): UserValidatorRegister {
    const registerSchema = z.object({
      name: z
        .string()
        .min(5)
        .trim()
        .toLowerCase()
        .regex(/^[^\d]*$/, "The name must not contain any numbers."),
      email: z.string().email().trim(),
      password: z
        .string()
        .min(8)
        .regex(
          /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/,
          "The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        ),
    });

    const isValid = registerSchema.safeParse({ name, email, password });

    if (isValid.error) {
      const { path, message } = isValid.error.issues[0];

      throw new InvalidCredentialsError(String(path[0]), message);
    }

    return isValid.data;
  }
}
