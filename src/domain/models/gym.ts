import { CheckIn } from "./check-in.js";

export type Gym = {
  id: string;
  title: string;
  cnpj: string;
  description?: string | null;
  phone?: string | null;
  latitude: number | string;
  longitude: number | string;
  CheckIn?: CheckIn[];
};
