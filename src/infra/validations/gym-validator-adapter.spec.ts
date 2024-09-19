import { describe, it, expect, beforeEach } from "vitest";

import { InvalidCredentialsError } from "@/domain/erros/invalid-credentials-error.js";
import { GymValidator } from "@/presentation/protocols/gym-validator.js";
import { GymValidatorAdapter } from "./gym-validator-adapter.js";

let sut: GymValidator;

describe("Gym Validator Adapter", () => {
  beforeEach(() => {
    sut = new GymValidatorAdapter();
  });

  describe("Create", () => {
    it("should return an error if the title field is not provided", () => {
      const gym = {
        title: "",
        cnpj: "00000000000000",
        description: "test description",
        phone: "0000000000",
        latitude: -27.2092052,
        longitude: -49.6401091,
      };

      expect(() => sut.create(gym)).toThrow(
        new InvalidCredentialsError(
          "title",
          "String must contain at least 4 character(s)"
        )
      );
    });

    it("should return an error if the cnpj field is not provided", () => {
      const gym = {
        title: "test academy",
        cnpj: "",
        description: "test description",
        phone: "0000000000",
        latitude: -27.2092052,
        longitude: -49.6401091,
      };

      expect(() => sut.create(gym)).toThrow(
        new InvalidCredentialsError(
          "cnpj",
          "String must contain at least 14 character(s)"
        )
      );
    });

    it("should validate successfully even if the description and telephone number are not provided", () => {
      const gym = {
        title: "test academy",
        cnpj: "00000000000000",
        latitude: -27.2092052,
        longitude: -49.6401091,
      };

      const result = sut.create(gym);

      expect(result).toEqual({
        title: "test academy",
        cnpj: "00000000000000",
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
      });
    });

    it("should return an error if the latitude field is not provided", () => {
      const gym = {
        title: "test academy",
        cnpj: "00000000000000",
        description: null,
        phone: null,
        latitude: "",
        longitude: -49.6401091,
      };

      expect(() => sut.create(gym)).toThrow(
        new InvalidCredentialsError(
          "latitude",
          "Expected number, received string"
        )
      );
    });

    it("should return an error if the longitude field is not provided", () => {
      const gym = {
        title: "test academy",
        cnpj: "00000000000000",
        description: null,
        phone: null,
        latitude: -49.6401091,
        longitude: "",
      };

      expect(() => sut.create(gym)).toThrow(
        new InvalidCredentialsError(
          "longitude",
          "Expected number, received string"
        )
      );
    });

    it("should return an error if the given title field is less than 4 characters long", () => {
      const gym = {
        title: "tes",
        cnpj: "00000000000000",
        description: null,
        phone: null,
        latitude: -49.6401091,
        longitude: -49.6401091,
      };

      expect(() => sut.create(gym)).toThrow(
        new InvalidCredentialsError(
          "title",
          "String must contain at least 4 character(s)"
        )
      );
    });

    it("should return an error if the given cnpj field is less than 14 characters long", () => {
      const gym = {
        title: "test",
        cnpj: "0000000000000",
        description: null,
        phone: null,
        latitude: -49.6401091,
        longitude: -49.6401091,
      };

      expect(() => sut.create(gym)).toThrow(
        new InvalidCredentialsError(
          "cnpj",
          "String must contain at least 14 character(s)"
        )
      );
    });

    it("should return an error if the given phone field is less than 15 characters long", () => {
      const gym = {
        title: "test",
        cnpj: "00000000000000",
        description: null,
        phone: "0000000000000000",
        latitude: -49.6401091,
        longitude: -49.6401091,
      };

      expect(() => sut.create(gym)).toThrow(
        new InvalidCredentialsError(
          "phone",
          "String must contain at most 15 character(s)"
        )
      );
    });

    it("should return an error if the phone field contains letters", () => {
      const gym = {
        title: "test",
        cnpj: "00000000000000",
        description: null,
        phone: "00000000000000a",
        latitude: -49.6401091,
        longitude: -49.6401091,
      };

      expect(() => sut.create(gym)).toThrow(
        new InvalidCredentialsError("phone", "format invalid")
      );
    });

    it("should successfully validate the fields", () => {
      const gym = {
        title: "test",
        cnpj: "00000000000000",
        description: null,
        phone: null,
        latitude: -49.6401091,
        longitude: -49.6401091,
      };

      const validation = sut.create(gym);

      expect(validation).toEqual({
        title: "test",
        cnpj: "00000000000000",
        description: null,
        phone: null,
        latitude: -49.6401091,
        longitude: -49.6401091,
      });
    });
  });

  describe("Nearby Gym", () => {
    it("should return an error if the latitude field contains an invalid value", () => {
      const gym = {
        latitude: 2349845723498234,
        longitude: -49.6401091,
      };

      expect(() => sut.nearbyGym(gym)).toThrow(
        new InvalidCredentialsError("latitude", "Invalid input")
      );
    });

    it("should return an error if the longitude field contains an invalid value", () => {
      const gym = {
        latitude: -49.6401091,
        longitude: 1231232131231233,
      };

      expect(() => sut.nearbyGym(gym)).toThrow(
        new InvalidCredentialsError("longitude", "Invalid input")
      );
    });

    it("should successfully validate the fields", () => {
      const gym = {
        latitude: -49.6401091,
        longitude: -49.6401091,
      };

      const validation = sut.nearbyGym(gym);

      expect(validation).toEqual({
        latitude: -49.6401091,
        longitude: -49.6401091,
      });
    });
  });

  describe.skip("Profile Recovery", () => {
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

  describe.skip("Authenticate", () => {
    it("should return an error if the email field is not provided", () => {
      const user = {
        email: "",
        password: "Test123@",
      };

      expect(() => sut.authenticate(user)).toThrow(
        new InvalidCredentialsError("e-mail or password", "invalid")
      );
    });

    it("should return an error if the password field is not provided", () => {
      const user = {
        email: "test@test.com",
        password: "",
      };

      expect(() => sut.authenticate(user)).toThrow(
        new InvalidCredentialsError("e-mail or password", "invalid")
      );
    });

    it("should return an error if the email field provided is invalid", () => {
      const user = {
        email: "test.com",
        password: "Test123@",
      };

      expect(() => sut.authenticate(user)).toThrow(
        new InvalidCredentialsError("e-mail or password", "invalid")
      );
    });

    it("should return an error if the given password field is less than 8 characters long", () => {
      const user = {
        email: "test@test.com",
        password: "1234567",
      };

      expect(() => sut.authenticate(user)).toThrow(
        new InvalidCredentialsError("e-mail or password", "invalid")
      );
    });

    it("should successfully validate the fields", () => {
      const user = {
        email: "test@test.com",
        password: "Test123@",
      };

      const validation = sut.authenticate(user);

      expect(validation).toEqual({
        email: "test@test.com",
        password: "Test123@",
      });
    });
  });
});
