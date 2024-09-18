import { Gym } from "@/domain/models/gym.js";

import {
  GymRepository,
  GymRepositoryCreate,
} from "@/domain/protocols/gym-repository.js";

import { prisma } from "./index.js";
import { Decimal } from "@prisma/client/runtime/library";

export class DbGymRepository implements GymRepository {
  findByCnpj(cnpj: string): Promise<Gym | null> {
    throw new Error("Method not implemented.");
  }

  async create({
    title,
    cnpj,
    description,
    phone,
    latitude,
    longitude,
  }: GymRepositoryCreate): Promise<Gym> {
    return await prisma.gym.create({
      data: {
        title,
        cnpj,
        description,
        phone,
        latitude: new Decimal(latitude),
        longitude: new Decimal(longitude),
      },
    });
  }
}
