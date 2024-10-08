import { User } from "@/domain/models/user.js";

import { UseCase } from "@/domain/protocols/use-case.js";
import { UserRepository } from "@/domain/protocols/user-repository.js";

import { ContentNotFount } from "@/domain/erros/content-not-found.js";

type UpdateInput = Pick<User, "id"> & Partial<Pick<User, "name" | "email">>;

type UpdateOutput = Pick<User, "id" | "name" | "email">;

export class UpdateUseCase implements UseCase<UpdateInput, UpdateOutput> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id, ...data }: UpdateInput): Promise<UpdateOutput> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new ContentNotFount("user");
    }

    const update = await this.userRepository.update({ id, ...data });

    const { password, created_at, role, ...rest } = update;

    return rest;
  }
}
