import { User } from "@/domain/models/user.js";

import { UseCase } from "@/domain/protocols/use-case.js";
import { Encrypter } from "@/domain/protocols/encrypter.js";
import { UserRepository } from "@/domain/protocols/user-repository.js";

import { AlreadyExists } from "@/domain/erros/already-exists-error.js";

type RegisterInput = Pick<User, "name" | "email" | "password">;

type RegisterOutput = void;

export class RegisterUseCase implements UseCase<RegisterInput, RegisterOutput> {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly userRepository: UserRepository
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterInput): Promise<RegisterOutput> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    console.log(userAlreadyExists)

    if (userAlreadyExists) {
      throw new AlreadyExists("User");
    }

    const passwordHash = await this.encrypter.encrypt(password);

    await this.userRepository.create({
      name,
      email,
      password: passwordHash,
    });
  }
}
