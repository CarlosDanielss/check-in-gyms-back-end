import { User } from "@/domain/models/user.js";

import { UseCase } from "@/domain/protocols/use-case.js";
import { UserRepository } from "@/domain/protocols/user-repository.js";

type ReadInput = { page: number };

type ReadOutput = User[];

export class ReadUseCase implements UseCase<ReadInput, ReadOutput> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ page }: ReadInput): Promise<ReadOutput> {
    const users = await this.userRepository.searchMany(page);

    return users;
  }
}
