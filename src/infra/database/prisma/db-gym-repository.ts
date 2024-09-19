import { Gym } from "@/domain/models/gym.js";

import {
  GymRepository,
  GymRepositoryCreate,
  GymRepositoryFindManyNearby,
} from "@/domain/protocols/gym-repository.js";

import { prisma } from "./index.js";
import { Decimal } from "@prisma/client/runtime/library";

export class DbGymRepository implements GymRepository {
  async findManyNearby({
    latitude,
    longitude,
  }: GymRepositoryFindManyNearby): Promise<Gym[]> {
    return await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;
  }

  async findByCnpj(cnpj: string): Promise<Gym | null> {
    return await prisma.gym.findUnique({
      where: { cnpj },
    });
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
