import { Decimal } from "@prisma/client/runtime/library";
import { CheckIn } from "./check-in.js";

export type Gym = {
  id: string;
  title: string;
  cnpj: string;
  description?: string | null;
  phone?: string | null;
  latitude: number | string | Decimal;
  longitude: number | string | Decimal;
  CheckIn?: CheckIn[];
};
