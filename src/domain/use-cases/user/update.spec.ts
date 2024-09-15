import { beforeEach, describe, expect, it } from "vitest";
import { randomUUID } from "crypto";

import { Encrypter } from "@/domain/protocols/encrypter.js";
import { UserRepository } from "@/domain/protocols/user-repository.js";

import { EncrypterAdapter } from "@/infra/criptography/encrypter-adapter.js";
import { InMemoryUserRepository } from "@/infra/database/in-memory/in-memory-user-repository.js";

import { UpdateUseCase } from "./update.js";
import { RegisterUseCase } from "./register.js";

import { ContentNotFount } from "@/domain/erros/content-not-found.js";

let encrypter: Encrypter;
let userRepository: UserRepository;
let registerUseCase: RegisterUseCase;
let sut: UpdateUseCase;

describe("Update Use Case", () => {
  beforeEach(() => {
    encrypter = new EncrypterAdapter();
    userRepository = new InMemoryUserRepository();
    registerUseCase = new RegisterUseCase(encrypter, userRepository);
    sut = new UpdateUseCase(userRepository);
  });

  it("should return an error if the user is not found", async () => {
    const updateUser = {
      id: randomUUID(),
      name: "new test",
      email: "test@test.br",
    };

    expect(() => sut.execute(updateUser)).rejects.toBeInstanceOf(
      ContentNotFount
    );
  });

  it("should update successfully", async () => {
    const registerUser = await registerUseCase.execute({
      name: "test test",
      email: "test@test.com",
      password: "Test123@",
    });

    const updateUser = {
      id: registerUser.id,
      name: "new test",
      email: "test@test.br",
    };

    const update = await sut.execute(updateUser);

    expect(update).toEqual({
      id: registerUser.id,
      name: "new test",
      email: "test@test.br",
    });
  });
});
