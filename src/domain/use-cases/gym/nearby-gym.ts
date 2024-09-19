import { Gym } from "@/domain/models/gym.js";
import { GymRepository } from "@/domain/protocols/gym-repository.js";

import { UseCase } from "@/domain/protocols/use-case.js";

type NearbyGymInput = Pick<Gym, "latitude" | "longitude">;

type NearbyGymOutput = Gym[];

export class NearbyGymUseCase
  implements UseCase<NearbyGymInput, NearbyGymOutput>
{
  constructor(private readonly gymRepository: GymRepository) {}

  async execute({
    latitude,
    longitude,
  }: NearbyGymInput): Promise<NearbyGymOutput> {
    const gyms = await this.gymRepository.findManyNearby({
      latitude: Number(latitude),
      longitude: Number(longitude),
    });

    return gyms;
  }
}
