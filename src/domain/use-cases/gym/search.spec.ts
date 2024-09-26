import { beforeEach, describe, expect, it } from "vitest";
import { randomUUID } from "crypto";

import { GymRepository } from "@/domain/protocols/gym-repository.js";

import { InMemoryGymRepository } from "@/infra/database/in-memory/in-memory-gym-repository.js";
import { SearchUseCase } from "./search.js";
import { ContentNotFount } from "@/domain/erros/content-not-found.js";

let gymRepository: GymRepository;
let sut: SearchUseCase;

describe("Search Use Case", () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository();
    sut = new SearchUseCase(gymRepository);
  });

  it("should return an error if no results are found", async () => {
    const query = {
      query: "a",
      page: 1,
    };

    expect(() => sut.execute(query)).rejects.toThrow(ContentNotFount);
    expect(() => sut.execute(query)).rejects.toEqual(
      new ContentNotFount("gym")
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

    const query = {
      query: "p",
      page: 1,
    };

    const result = await sut.execute(query);

    expect(result).toEqual([createGym]);
    expect(result).toHaveLength(1);
  });
});
