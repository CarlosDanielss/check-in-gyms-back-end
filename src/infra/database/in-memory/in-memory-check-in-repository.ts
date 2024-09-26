import { randomUUID } from "crypto";
import { CheckIn } from "@/domain/models/check-in.js";
import {
  CheckInRepository,
  CheckInRepositoryCreate,
} from "@/domain/protocols/check-in-repository.js";

export class InMemoryCheckInRepository implements CheckInRepository {
  public items: CheckIn[] = [];

  async findByUserIdOnDate(
    userId: string,
    date: Date
  ): Promise<CheckIn | null> {
    const startOfTheDay = new Date(date.setHours(0, 0, 0, 0)); // inicio do dia
    const endOfTheDay = new Date(date.setHours(23, 59, 59, 999)); // final do dia

    const checkInOnSameDate = this.items.find((checkIn) => {
      const checkInDate = new Date(checkIn.created_at);
      const isOnSameDate =
        checkInDate >= startOfTheDay && checkInDate <= endOfTheDay;

      return checkIn.userId === userId && isOnSameDate;
    });

    if (!checkInOnSameDate) {
      return null;
    }

    return checkInOnSameDate;
  }

  async create({ gymId, userId }: CheckInRepositoryCreate): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      gymId,
      userId,
      validated_at: null,
      created_at: new Date(),
    };

    this.items.push(checkIn);

    return checkIn;
  }
}
