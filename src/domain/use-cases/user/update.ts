import { User } from "@/domain/models/user.js";

import { UseCase } from "@/domain/protocols/use-case.js";
import { UserRepository } from "@/domain/protocols/user-repository.js";

import { ContentNotFount } from "@/domain/erros/content-not-found.js";

type UpdateInput = Pick<User, "id"> & Partial<Pick<User, "name" | "email">>;

type UpdateOutput = void;

export class UpdateUseCase implements UseCase<UpdateInput, UpdateOutput> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id, ...data }: UpdateInput): Promise<UpdateOutput> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new ContentNotFount("user");
    }

    await this.userRepository.update({ id, ...data });
  }
}
