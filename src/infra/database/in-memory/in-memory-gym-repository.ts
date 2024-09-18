import { randomUUID } from "node:crypto";

import { Gym } from "@/domain/models/gym.js";

import {
  GymRepository,
  GymRepositoryCreate,
} from "@/domain/protocols/gym-repository.js";

export class InMemoryGymRepository implements GymRepository {
  public items: Gym[] = [];

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
