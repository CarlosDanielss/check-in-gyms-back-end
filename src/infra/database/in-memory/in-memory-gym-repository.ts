import { randomUUID } from "node:crypto";

import { Gym } from "@/domain/models/gym.js";

import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates.js";
import {
  GymRepository,
  GymRepositoryCreate,
  GymRepositoryFindManyNearby,
} from "@/domain/protocols/gym-repository.js";

export class InMemoryGymRepository implements GymRepository {
  public items: Gym[] = [];

  async findMany(query: string, page: number): Promise<Gym[]> {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20);
  }

  async findManyNearby(data: GymRepositoryFindManyNearby): Promise<Gym[]> {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: data.latitude, longitude: data.longitude },
        {
          latitude: Number(item.latitude),
          longitude: Number(item.longitude),
        }
      );

      return distance < 10;
    });
  }

  async findByCnpj(cnpj: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.cnpj === cnpj);

    if (!gym) {
      return null;
    }

    return gym;
  }

  async create(data: GymRepositoryCreate): Promise<Gym> {
    const gym = {
      id: randomUUID(),
      ...data,
    };

    this.items.push(gym);

    return gym;
  }
}
