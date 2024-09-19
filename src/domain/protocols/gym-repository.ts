import { Gym } from "../models/gym.js";

export interface GymRepositoryFindManyNearby {
  latitude: number;
  longitude: number;
}

export type GymRepositoryCreate = Omit<Gym, "id">;

export interface GymRepository {
  findManyNearby(data: GymRepositoryFindManyNearby): Promise<Gym[]>;
  findByCnpj(cnpj: string): Promise<Gym | null>;
  create(gym: GymRepositoryCreate): Promise<Gym>;
}
