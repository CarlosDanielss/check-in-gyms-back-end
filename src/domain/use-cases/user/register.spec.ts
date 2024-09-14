import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Encrypter } from "@/domain/protocols/encrypter.js";
import { UserRepository } from "@/domain/protocols/user-repository.js";

import { RegisterUseCase } from "./register.js";
import { EncrypterAdapter } from "@/infra/criptography/encrypter-adapter.js";
import { InMemoryUserRepository } from "@/infra/database/in-memory/in-memory-user-repository.js";

import { AlreadyExists } from "@/domain/erros/already-exists-error.js";

let encrypter: Encrypter;
let userRepository: UserRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    encrypter = new EncrypterAdapter();
    userRepository = new InMemoryUserRepository();
    sut = new RegisterUseCase(encrypter, userRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should not be able to register with same email twice", async () => {
    const user = {
      name: "test test",
      email: "test@test.com",
      password: "Test123@",
    };

    await sut.execute(user);

    expect(() => sut.execute(user)).rejects.toBeInstanceOf(AlreadyExists);
    expect(() => sut.execute(user)).rejects.toEqual(new AlreadyExists("User"));
  });

  it("should hash user password upon registration", async () => {
    const user = {
      name: "test test",
      email: "test@test.com",
      password: "Test123@",
    };

    const registerUser = await sut.execute(user);

    const isPasswordCorrectlyHashed = await encrypter.compare(
      user.password,
      registerUser.password
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should register in success", async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 13, 40));

    const user = {
      name: "test test",
      email: "test@test.com",
      password: "Test123@",
    };

    const registerUser = await sut.execute(user);

    expect(registerUser.id).toEqual(expect.any(String));
    expect(registerUser).toEqual({
      id: registerUser.id,
      name: "test test",
      email: "test@test.com",
      password: registerUser.password,
      role: "MEMBER",
      created_at: new Date(2024, 0, 1, 13, 40),
    });
  });
});
