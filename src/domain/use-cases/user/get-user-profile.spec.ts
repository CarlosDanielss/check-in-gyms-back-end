import { beforeEach, describe, expect, it } from "vitest";
import { randomUUID } from "crypto";

import { UserRepository } from "@/domain/protocols/user-repository.js";

import { InMemoryUserRepository } from "@/infra/database/in-memory/in-memory-user-repository.js";

import { ContentNotFount } from "@/domain/erros/content-not-found.js";
import { GetUserProfileUseCase } from "./get-user-profile.js";
import { RegisterUseCase } from "./register.js";
import { Encrypter } from "@/domain/protocols/encrypter.js";
import { EncrypterAdapter } from "@/infra/criptography/encrypter-adapter.js";

let encrypter: Encrypter;
let userRepository: UserRepository;
let registerUseCase: RegisterUseCase;
let sut: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    encrypter = new EncrypterAdapter();
    userRepository = new InMemoryUserRepository();
    registerUseCase = new RegisterUseCase(encrypter, userRepository);
    sut = new GetUserProfileUseCase(userRepository);
  });

  it("should return an error if the user is not found", async () => {
    const getUserProfile = {
      id: randomUUID(),
    };

    expect(() => sut.execute(getUserProfile)).rejects.toBeInstanceOf(
      ContentNotFount
    );
  });

  it("should find the profile successfully", async () => {
    const registerUser = await registerUseCase.execute({
      name: "test test",
      email: "test@test.com",
      password: "Test123@",
    });

    const getProfile = {
      id: registerUser.id,
    };

    const userProfile = await sut.execute(getProfile);

    expect(userProfile).toEqual({
      id: registerUser.id,
      name: "test test",
      email: "test@test.com",
      role: "MEMBER",
    });
  });
});
