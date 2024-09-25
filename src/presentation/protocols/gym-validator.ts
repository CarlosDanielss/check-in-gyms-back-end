import { Gym } from "@/domain/models/gym.js";

export type GymValidatorSearchInput = {
  query: string;
  page: string;
};

export type GymValidatorSearchOutput = {
  query: string;
  page: number;
};

export type GymValidatorNearby = {
  latitude: number;
  longitude: number;
};

export type GymValidatorCreate = Omit<Gym, "id" | "CheckIn">;

export interface GymValidator {
  search(data: GymValidatorSearchInput): GymValidatorSearchOutput;
  nearbyGym(locale: GymValidatorNearby): GymValidatorNearby;
  create(gym: GymValidatorCreate): GymValidatorCreate;
}
