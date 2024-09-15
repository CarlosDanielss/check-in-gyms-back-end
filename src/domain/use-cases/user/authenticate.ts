import { User } from "@/domain/models/user.js";

import { UseCase } from "@/domain/protocols/use-case.js";
import { Encrypter } from "@/domain/protocols/encrypter.js";
import { UserRepository } from "@/domain/protocols/user-repository.js";

import { InvalidCredentialsError } from "@/domain/erros/invalid-credentials-error.js";

type AuthenticateInput = Pick<User, "email" | "password">;

type AuthenticateOutput = Omit<User, "password">;

export class AuthenticateUseCase
  implements UseCase<AuthenticateInput, AuthenticateOutput>
{
  constructor(
    private readonly encrypter: Encrypter,
    private readonly userRepository: UserRepository
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateInput): Promise<AuthenticateOutput> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError("e-mail or password", "invalid");
    }

    const isPasswordMatches = await this.encrypter.compare(
      password,
      user.password
    );

    if (!isPasswordMatches) {
      throw new InvalidCredentialsError("e-mail or password", "invalid");
    }

    const { password: _, ...rest } = user;

    return rest;
  }
}
