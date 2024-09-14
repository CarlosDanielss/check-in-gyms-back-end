import { beforeEach, describe, expect, it } from "vitest";

import { Encrypter } from "@/domain/protocols/encrypter.js";
import { EncrypterAdapter } from "./encrypter-adapter.js";

let sut: Encrypter;

describe("Encrypter Adapter", () => {
  beforeEach(() => {
    sut = new EncrypterAdapter();
  });

  it("should return a hash on success", async () => {
    const value = "test_value";

    const hash = await sut.encrypt(value);

    expect(typeof hash).toBe("string");
    expect(hash.length).toBeGreaterThan(0);
  });

  it("should return a compare on success", async () => {
    const value = "test_value";

    const hash = await sut.encrypt(value);

    const compare = await sut.compare(value, hash);

    expect(compare).toEqual(true);
  });
});
