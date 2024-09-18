import { Gym } from "../models/gym.js";

export type GymRepositoryCreate = Omit<Gym, "id">;

export interface GymRepository {
  findByCnpj(cnpj: string): Promise<Gym | null>;
  create(gym: GymRepositoryCreate): Promise<Gym>;
}
