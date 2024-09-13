import { beforeEach, describe, expect, it } from "vitest";

import { EnvValidator } from "@/main/protocols/env-validator.js";
import { EnvValidatorAdapter } from "./env-validator-adapter.js";

let sut: EnvValidator;

describe("Env Validator Adapter", () => {
  beforeEach(() => {
    sut = new EnvValidatorAdapter();
  });

  it("should return an error if the NODE_ENV field is not provided", () => {
    const environment = {
      JWT_SECRET: "jwtsecrettest",
      PORT: "3333",
      DATABASE_URL: "postgresql://test:123456@localhost:5432/test",
    };

    expect(() => sut.exec(environment)).toThrow(
      Error(`Invalid environment variables [NODE_ENV]`)
    );
  });

  it("should return an error if the JWT_SECRET field is not provided", () => {
    const environment = {
      NODE_ENV: "test",
      PORT: "3333",
      DATABASE_URL: "postgresql://test:123456@localhost:5432/test",
    };

    expect(() => sut.exec(environment)).toThrow(
      Error(`Invalid environment variables [JWT_SECRET]`)
    );
  });

  it("should set the PORT to [3333] if the PORT field is not provided", () => {
    const environment = {
      NODE_ENV: "test",
      JWT_SECRET: "jwtsecrettest",
      DATABASE_URL: "postgresql://test:123456@localhost:5432/test",
    };

    const validation = sut.exec(environment);

    expect(validation).toEqual({
      NODE_ENV: "test",
      JWT_SECRET: "jwtsecrettest",
      PORT: 3333,
      DATABASE_URL: "postgresql://test:123456@localhost:5432/test",
    });
  });

  it("should return an error if the DATABASE_URL field is not provided", () => {
    const environment = {
      NODE_ENV: "test",
      JWT_SECRET: "jwtsecrettest",
      PORT: "3333",
    };

    expect(() => sut.exec(environment)).toThrow(
      Error(`Invalid environment variables [DATABASE_URL]`)
    );
  });

  it("should return an error if the NODE_ENV field receives a value other than developer, test or production", () => {
    const environment = {
      NODE_ENV: "rain",
      JWT_SECRET: "jwtsecrettest",
      PORT: "3333",
      DATABASE_URL: "postgresql://test:123456@localhost:5432/test",
    };

    expect(() => sut.exec(environment)).toThrow(
      Error(`Invalid environment variables [NODE_ENV]`)
    );
  });

  it("should return an error if the DATABASE_URL field does not have a valid link format", () => {
    const environment = {
      NODE_ENV: "test",
      JWT_SECRET: "jwtsecrettest",
      PORT: "3333",
      DATABASE_URL: "testdatabaseurl",
    };

    expect(() => sut.exec(environment)).toThrow(
      Error(`Invalid environment variables [DATABASE_URL]`)
    );
  });

  it("should successfully validate the fields", () => {
    const environment = {
      NODE_ENV: "test",
      JWT_SECRET: "jwtsecrettest",
      PORT: "3333",
      DATABASE_URL: "postgresql://test:123456@localhost:5432/test",
    };

    const validation = sut.exec(environment);

    expect(validation).toEqual({
      NODE_ENV: "test",
      JWT_SECRET: "jwtsecrettest",
      PORT: 3333,
      DATABASE_URL: "postgresql://test:123456@localhost:5432/test",
    });
  });
});
