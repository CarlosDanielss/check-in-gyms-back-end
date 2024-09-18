import { Gym } from "@/domain/models/gym.js";

import { UseCase } from "@/domain/protocols/use-case.js";

import { GymRepository } from "@/domain/protocols/gym-repository.js";
import { AlreadyExists } from "@/domain/erros/already-exists-error.js";

type CreateInput = Omit<Gym, "id">;

type CreateOutput = Gym;

export class CreateUseCase implements UseCase<CreateInput, CreateOutput> {
  constructor(private readonly gymRepository: GymRepository) {}

  async execute({
    title,
    cnpj,
    description,
    phone,
    latitude,
    longitude,
    CheckIn,
  }: CreateInput): Promise<CreateOutput> {
    const gymAlreadyExists = await this.gymRepository.findByCnpj(cnpj);

    if (gymAlreadyExists) {
      throw new AlreadyExists("gym");
    }

    const gym = await this.gymRepository.create({
      title,
      cnpj,
      description,
      phone,
      latitude,
      longitude,
      CheckIn,
    });

    return gym;
  }
}
