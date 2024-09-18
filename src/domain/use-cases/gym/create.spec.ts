import { beforeEach, describe, expect, it } from "vitest";
import { randomUUID } from "node:crypto";

import { GymRepository } from "@/domain/protocols/gym-repository.js";
import { CreateUseCase } from "./create.js";

import { InMemoryGymRepository } from "@/infra/database/in-memory/in-memory-gym-repository.js";
import { AlreadyExists } from "@/domain/erros/already-exists-error.js";

let gymRepository: GymRepository;
let sut: CreateUseCase;

describe("Create Use Case", () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository();
    sut = new CreateUseCase(gymRepository);
  });

  it("should return an error if there is already a gym registered with the same cnpj", async () => {
    const gym = {
      id: randomUUID(),
      title: "power fit",
      cnpj: "00000000000000",
      description: null,
      phone: null,
      latitude: "23.7381435",
      longitude: "46.8634038",
    };

    await sut.execute(gym);

    expect(() => sut.execute(gym)).rejects.toThrow(AlreadyExists);
    expect(() => sut.execute(gym)).rejects.toEqual(new AlreadyExists("gym"));
  });

  it("should create in success", async () => {
    const gym = {
      id: randomUUID(),
      title: "power fit",
      cnpj: "00000000000000",
      description: null,
      phone: null,
      latitude: "23.7381435",
      longitude: "46.8634038",
    };

    const result = await sut.execute(gym);

    expect(result).toEqual({
      id: result.id,
      title: "power fit",
      cnpj: "00000000000000",
      description: null,
      phone: null,
      latitude: "23.7381435",
      longitude: "46.8634038",
    });
  });
});
