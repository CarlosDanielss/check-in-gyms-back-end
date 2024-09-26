import { ContentNotFount } from "@/domain/erros/content-not-found.js";
import { MaxDistanceError } from "@/domain/erros/max-distance-error.js";
import { MaxNumberOfCheckInsError } from "@/domain/erros/max-number-of-check-ins-error.js";
import { CheckIn } from "@/domain/models/check-in.js";
import { CheckInRepository } from "@/domain/protocols/check-in-repository.js";
import { GymRepository } from "@/domain/protocols/gym-repository.js";
import { UseCase } from "@/domain/protocols/use-case.js";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates.js";

type CreateInput = Pick<CheckIn, "userId" | "gymId"> & {
  userLatitude: number;
  userLongitude: number;
};

type CreateOutput = CheckIn;

export class CreateUseCase implements UseCase<CreateInput, CreateOutput> {
  constructor(
    private readonly checkInRepository: CheckInRepository,
    private readonly gymRepository: GymRepository
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CreateInput): Promise<CreateOutput> {
    const gym = await this.gymRepository.findById(gymId);

    if (!gym) {
      throw new ContentNotFount("gym");
    }

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: Number(gym.latitude),
        longitude: Number(gym.longitude),
      }
    );

    const maxDistanceInKilometers = 0.1;

    if (distance > maxDistanceInKilometers) {
      throw new MaxDistanceError();
    }

    const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(
      userId,
      new Date()
    );

    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckInsError();
    }

    const checkIn = await this.checkInRepository.create({
      gymId,
      userId,
    });

    return checkIn;
  }
}
