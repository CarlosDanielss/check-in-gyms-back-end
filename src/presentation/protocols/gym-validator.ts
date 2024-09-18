import { Gym } from "@/domain/models/gym.js";

export type GymValidatorCreate = Omit<Gym, "id" | "CheckIn">;

export interface GymValidator {
  create(gym: GymValidatorCreate): GymValidatorCreate;
}
