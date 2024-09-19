import { Gym } from "@/domain/models/gym.js";

export type GymValidatorNearby = {
  latitude: number;
  longitude: number;
};

export type GymValidatorCreate = Omit<Gym, "id" | "CheckIn">;

export interface GymValidator {
  nearbyGym(locale: GymValidatorNearby): GymValidatorNearby;
  create(gym: GymValidatorCreate): GymValidatorCreate;
}
