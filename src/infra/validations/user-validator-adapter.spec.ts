import { describe, it, expect, beforeEach } from "vitest";
import { randomUUID } from "crypto";

import { UserValidator } from "@/presentation/protocols/user-validator.js";
import { UserValidatorAdapter } from "./user-validator-adapter.js";
import { InvalidCredentialsError } from "@/domain/erros/invalid-credentials-error.js";

let sut: UserValidator;
const UUID = randomUUID();

describe("User Validator Adapter", () => {
  beforeEach(() => {
    sut = new UserValidatorAdapter();
  });

  describe("Register", () => {
    it("should return an error if the name field is not provided", () => {
      const user = {
        name: "",
        email: "test@test.com",
        password: "Test123@",
      };

      expect(() => sut.register(user)).toThrow(
        new InvalidCredentialsError(
          "name",
          "String must contain at least 5 character(s)"
        )
      );
    });

    it("should return an error if the email field is not provided", () => {
      const user = {
        name: "test test",
        email: "",
        password: "Test123@",
      };

      expect(() => sut.register(user)).toThrow(
        new InvalidCredentialsError("email", "Invalid email")
      );
    });

    it("should return an error if the password field is not provided", () => {
      const user = {
        name: "test test",
        email: "test@test.com",
        password: "",
      };

      expect(() => sut.register(user)).toThrow(
        new InvalidCredentialsError(
          "password",
          "String must contain at least 8 character(s)"
        )
      );
    });

    it("should return an error if the given name field contains numbers", () => {
      const user = {
        name: "test12",
        email: "test@test.com",
        password: "Test123@",
      };

      expect(() => sut.register(user)).toThrow(
        new InvalidCredentialsError(
          "name",
          "The name must not contain any numbers."
        )
      );
    });

    it("should return an error if the given name field is less than 5 characters long", () => {
      const user = {
        name: "test",
        email: "test@test.com",
        password: "Test123@",
      };

      expect(() => sut.register(user)).toThrow(
        new InvalidCredentialsError(
          "name",
          "String must contain at least 5 character(s)"
        )
      );
    });

    it("should return an error if the email field provided is invalid", () => {
      const user = {
        name: "test test",
        email: "test.com",
        password: "Test123@",
      };

      expect(() => sut.register(user)).toThrow(
        new InvalidCredentialsError("email", "Invalid email")
      );
    });

    it("should return an error if the given password field is less than 8 characters long", () => {
      const user = {
        name: "test test",
        email: "test@test.com",
        password: "1234567",
      };

      expect(() => sut.register(user)).toThrow(
        new InvalidCredentialsError(
          "password",
          "String must contain at least 8 character(s)"
        )
      );
    });

    it("should return an error if the password field provided does not meet the minimum password strength criteria", () => {
      const user = {
        name: "test test",
        email: "test@test.com",
        password: "12345678",
      };

      expect(() => sut.register(user)).toThrow(
        new InvalidCredentialsError(
          "password",
          "The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        )
      );
    });

    it("should successfully validate the fields", () => {
      const user = {
        name: "test test",
        email: "test@test.com",
        password: "Test123@",
      };

      const validation = sut.register(user);

      expect(validation).toEqual({
        name: "test test",
        email: "test@test.com",
        password: "Test123@",
      });
    });
  });

  describe("Update", () => {
    it("should return an error if the id field is not provided", () => {
      const user = {
        id: "",
        name: "test test",
        email: "test@test.com",
      };

      expect(() => sut.update(user)).toThrow(
        new InvalidCredentialsError("id", "Invalid uuid")
      );
    });

    it("should return an error if name or email field is not provided", () => {
      const user = {
        id: UUID,
      };

      expect(() => sut.update(user)).toThrow(
        new InvalidCredentialsError(
          "name or email",
          "If currentPassword or newPassword are provided, both must be provided."
        )
      );
    });

    it("should return an error if the given name field contains numbers", () => {
      const user = {
        id: UUID,
        name: "test12",
      };

      expect(() => sut.update(user)).toThrow(
        new InvalidCredentialsError(
          "name",
          "The name must not contain any numbers."
        )
      );
    });

    it("should return an error if the given name field is less than 5 characters long", () => {
      const user = {
        id: UUID,
        name: "test",
      };

      expect(() => sut.update(user)).toThrow(
        new InvalidCredentialsError(
          "name",
          "String must contain at least 5 character(s)"
        )
      );
    });

    it("should return an error if the email field provided is invalid", () => {
      const user = {
        id: UUID,
        name: "test test",
        email: "test.com",
      };

      expect(() => sut.update(user)).toThrow(
        new InvalidCredentialsError("email", "Invalid email")
      );
    });

    it("should successfully validate the fields", () => {
      const user = {
        id: UUID,
        name: "test test",
        email: "test@test.com",
      };

      const validation = sut.update(user);

      expect(validation).toEqual({
        id: user.id,
        name: "test test",
        email: "test@test.com",
      });
    });
  });

  describe("Profile Recovery", () => {
    it("should return an error if the id field is not provided", () => {
      const user = {
        id: "",
      };

      expect(() => sut.profileRecovery(user)).toThrow(
        new InvalidCredentialsError("id", "Invalid uuid")
      );
    });

    it("should return an error if the provided id field has an invalid format", () => {
      const user = {
        id: "asdasdasdasdasdasd",
      };

      expect(() => sut.profileRecovery(user)).toThrow(
        new InvalidCredentialsError("id", "Invalid uuid")
      );
    });

    it("should successfully validate the fields", () => {
      const user = {
        id: UUID,
      };

      const validation = sut.profileRecovery(user);

      expect(validation).toEqual({
        id: user.id,
      });
    });
  });
});
