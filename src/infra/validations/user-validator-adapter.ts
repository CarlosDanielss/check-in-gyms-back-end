import { z } from "zod";

import {
  UserValidator,
  UserValidatorProfileRecovery,
  UserValidatorRegister,
  UserValidatorUpdate,
} from "@/presentation/protocols/user-validator.js";

import { InvalidCredentialsError } from "@/domain/erros/invalid-credentials-error.js";

export class UserValidatorAdapter implements UserValidator {
  profileRecovery(
    id: UserValidatorProfileRecovery
  ): UserValidatorProfileRecovery {
    const profileRecoverySchema = z.object({
      id: z.string().uuid(),
    });

    const validation = profileRecoverySchema.safeParse(id);

    if (validation.error) {
      const { path, message } = validation.error.issues[0];

      throw new InvalidCredentialsError(String(path[0]), message);
    }

    return validation.data;
  }

  update({ id, name, email }: UserValidatorUpdate): UserValidatorUpdate {
    const updateSchema = z
      .object({
        id: z.string().uuid(),
        name: z
          .string()
          .min(5)
          .trim()
          .toLowerCase()
          .regex(/^[^\d]*$/, "The name must not contain any numbers.")
          .optional(),
        email: z.string().email().trim().optional(),
      })
      .refine(
        (data) => {
          const hasName = Boolean(data.name);
          const hasEmail = Boolean(data.email);

          return hasName ?? hasEmail;
        },
        {
          path: ["name or email"],
          message:
            "If currentPassword or newPassword are provided, both must be provided.",
        }
      );

    const validation = updateSchema.safeParse({ id, name, email });

    if (validation.error) {
      const { path, message } = validation.error.issues[0];

      throw new InvalidCredentialsError(String(path[0]), message);
    }

    return validation.data;
  }

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

    const validation = registerSchema.safeParse({ name, email, password });

    if (validation.error) {
      const { path, message } = validation.error.issues[0];

      throw new InvalidCredentialsError(String(path[0]), message);
    }

    return validation.data;
  }
}
