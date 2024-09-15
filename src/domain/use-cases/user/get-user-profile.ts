import { ContentNotFount } from "@/domain/erros/content-not-found.js";
import { User } from "@/domain/models/user.js";
import { UseCase } from "@/domain/protocols/use-case.js";
import { UserRepository } from "@/domain/protocols/user-repository.js";

type GetUserProfileInput = Pick<User, "id">;

type GetUserProfileOutput = Omit<User, "password" | "created_at">;

export class GetUserProfileUseCase
  implements UseCase<GetUserProfileInput, GetUserProfileOutput>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id }: GetUserProfileInput): Promise<GetUserProfileOutput> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new ContentNotFount("user");
    }

    const { password, created_at, ...rest } = user;

    return rest;
  }
}
