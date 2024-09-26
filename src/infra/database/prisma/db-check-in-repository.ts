import { CheckIn } from "@/domain/models/check-in.js";
import {
  CheckInRepository,
  CheckInRepositoryCreate,
} from "@/domain/protocols/check-in-repository.js";
import { prisma } from "./index.js";

export class DbCheckInRepository implements CheckInRepository {
  async findByUserIdOnDate(
    userId: string,
    date: Date
  ): Promise<CheckIn | null> {
    const startOfTheDay = new Date(date.setHours(0, 0, 0, 0)); // inicio do dia
    const endOfTheDay = new Date(date.setHours(23, 59, 59, 999)); // final do dia

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        userId,
        created_at: {
          gte: startOfTheDay,
          lte: endOfTheDay,
        },
      },
    });

    return checkIn;
  }

  async create({ gymId, userId }: CheckInRepositoryCreate): Promise<CheckIn> {
    return await prisma.checkIn.create({
      data: {
        userId,
        gymId,
      },
    });
  }
}
