import { CheckIn } from "../models/check-in.js";

export type CheckInRepositoryCreate = Pick<CheckIn, "userId" | "gymId">;

export interface CheckInRepository {
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
  create(checkIn: CheckInRepositoryCreate): Promise<CheckIn>;
}
