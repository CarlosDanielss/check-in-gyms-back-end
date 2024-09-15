import { beforeEach, describe, expect, it, vi } from "vitest";

import { Encrypter } from "@/domain/protocols/encrypter.js";
import { UserRepository } from "@/domain/protocols/user-repository.js";

import { RegisterUseCase } from "./register.js";
import { EncrypterAdapter } from "@/infra/criptography/encrypter-adapter.js";
import { AuthenticateUseCase } from "./authenticate.js";
import { InMemoryUserRepository } from "@/infra/database/in-memory/in-memory-user-repository.js";

import { InvalidCredentialsError } from "@/domain/erros/invalid-credentials-error.js";

let encrypter: Encrypter;
let userRepository: UserRepository;
let registerUseCase: RegisterUseCase;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    encrypter = new EncrypterAdapter();
    userRepository = new InMemoryUserRepository();
    registerUseCase = new RegisterUseCase(encrypter, userRepository);
    sut = new AuthenticateUseCase(encrypter, userRepository);

    vi.useFakeTimers();
  });

  it("should return an error if there is no user registered with the email", async () => {
    const user = {
      email: "test@test.com",
      password: "Test123@",
    };

    await expect(() => sut.execute(user)).rejects.toBeInstanceOf(
      InvalidCredentialsError
    );
  });

  it("should return an error if the password provided is invalid", async () => {
    await registerUseCase.execute({
      name: "test test",
      email: "test@test.com",
      password: "Test123@",
    });

    const user = { email: "test@test.com", password: "Test123" };

    const isPasswordMatches = await encrypter.compare(
      "Test123@",
      user.password
    );

    expect(isPasswordMatches).toEqual(false);
    expect(() => sut.execute(user)).rejects.toBeInstanceOf(
      InvalidCredentialsError
    );
  });

  it("should authenticate successfully", async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 13, 40));

    const registerUser = await registerUseCase.execute({
      name: "test test",
      email: "test@test.com",
      password: "Test123@",
    });

    const user = { email: "test@test.com", password: "Test123@" };

    const authenticate = await sut.execute(user);

    expect(authenticate).toEqual({
      id: registerUser.id,
      name: "test test",
      email: "test@test.com",
      role: "MEMBER",
      created_at: new Date(2024, 0, 1, 13, 40),
    });
  });
});
