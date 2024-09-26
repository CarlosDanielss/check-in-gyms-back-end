import { beforeEach, describe, expect, it } from "vitest";
import { randomUUID } from "crypto";

import { GymRepository } from "@/domain/protocols/gym-repository.js";

import { InMemoryGymRepository } from "@/infra/database/in-memory/in-memory-gym-repository.js";
import { ContentNotFount } from "@/domain/erros/content-not-found.js";
import { NearbyGymUseCase } from "./nearby-gym.js";

let gymRepository: GymRepository;
let sut: NearbyGymUseCase;

describe("Nearby Use Case", () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository();
    sut = new NearbyGymUseCase(gymRepository);
  });

  it("should return an error if no results are found", async () => {
    const userLocale = {
      latitude: "23.7381435",
      longitude: "46.8634038",
    };

    expect(() => sut.execute(userLocale)).rejects.toThrow(ContentNotFount);
    expect(() => sut.execute(userLocale)).rejects.toEqual(
      new ContentNotFount("gyms")
    );
  });

  it("should search in success", async () => {
    const createGym = {
      id: randomUUID(),
      title: "power fit",
      cnpj: "00000000000000",
      description: null,
      phone: null,
      latitude: "23.7381435",
      longitude: "46.8634038",
    };

    await gymRepository.create(createGym);

    const userLocale = {
      latitude: "23.7381435",
      longitude: "46.8634038",
    };

    const result = await sut.execute(userLocale);

    expect(result).toEqual([createGym]);
    expect(result).toHaveLength(1);
  });
});
