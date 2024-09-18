import { CheckIn } from "./check-in.js";

export type Gym = {
  id: string;
  title: string;
  description?: string | null;
  phone?: string | null;
  latitude: number | string;
  longitude: number | string;
  CheckIn?: CheckIn[];
};
