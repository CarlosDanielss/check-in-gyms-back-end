import { z } from "zod";

import {
  GymValidator,
  GymValidatorCreate,
} from "@/presentation/protocols/gym-validator.js";

import { InvalidCredentialsError } from "@/domain/erros/invalid-credentials-error.js";

export class GymValidatorAdapter implements GymValidator {
  create({
    title,
    cnpj,
    description,
    phone,
    latitude,
    longitude,
  }: GymValidatorCreate): GymValidatorCreate {
    const createSchema = z.object({
      title: z.string().min(4).trim().toLowerCase(),
      cnpj: z.string().min(14).trim(),
      description: z.string().trim().nullable().default(null),
      phone: z
        .string()
        .max(15)
        .regex(/^\+?[1-9]\d{1,15}$/, {
          message: "format invalid",
        })
        .nullable()
        .default(null),
      latitude: z.number().refine((value) => {
        return Math.abs(value) <= 90;
      }),
      longitude: z.number().refine((value) => {
        return Math.abs(value) <= 180;
      }),
    });

    const validation = createSchema.safeParse({
      title,
      cnpj,
      description,
      phone,
      latitude,
      longitude,
    });

    if (validation.error) {
      const { path, message } = validation.error.issues[0];

      throw new InvalidCredentialsError(String(path[0]), message);
    }

    return validation.data;
  }
}
