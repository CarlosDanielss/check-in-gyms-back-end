import { Gym } from "@/domain/models/gym.js";

export type GymValidatorSearch = {
  query: string;
  page: number;
};

export type GymValidatorNearby = {
  latitude: number;
  longitude: number;
};

export type GymValidatorCreate = Omit<Gym, "id" | "CheckIn">;

export interface GymValidator {
  search(query: string, page: string): GymValidatorSearch;
  nearbyGym(locale: GymValidatorNearby): GymValidatorNearby;
  create(gym: GymValidatorCreate): GymValidatorCreate;
}
