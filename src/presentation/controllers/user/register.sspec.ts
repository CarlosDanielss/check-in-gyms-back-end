import { describe, it, expect, beforeEach } from "vitest";

import { RegisterController } from "./register.js";
import { UserValidator } from "@/presentation/protocols/user-validator.js";
import { UserValidatorAdapter } from "@/infra/validations/user-validator-adapter.js";
import { RegisterUseCase } from "@/domain/use-cases/user/register.js";

let userValidator: UserValidator;
let registerUseCase: RegisterUseCase;
let sut: RegisterController;

describe.skip("User Register Controller", () => {
  beforeEach(() => {
    userValidator = new UserValidatorAdapter();
    sut = new RegisterController(userValidator, registerUseCase);
  });

  it("should return 201 if params is provided correctly", async () => {
    const request = await sut.handle({
      body: {
        name: "test completed",
        email: "test@test.com",
        password: "Test@123",
      },
    });

    expect(request.statusCode).toEqual(201);
    expect(request.body).toEqual({
      name: "test completed",
      email: "test@test.com",
      password: "Test@123",
    });
  });

  it("shold return 400 if name is not provided", async () => {
    const request = await sut.handle({
      body: {
        name: "",
        email: "test@test.com",
        password: "Test@123",
      },
    });

    console.log(request)

    expect(request.statusCode).toEqual(400);
    
  });

  it("should return 400 if the provided name has less than 5 characters", async () => {
    const request = await sut.handle({
      body: {
        name: "test",
        email: "test@test.com",
        password: "Test@123",
      },
    });

    expect(request.statusCode).toEqual(400);
    expect(request.body).toEqual({
      message:
        "InvalidParamError[name]: String must contain at least 5 character(s)",
    });
  });

  it("should return 400 if the name provided has a number", async () => {
    const request = await sut.handle({
      body: {
        name: "test1",
        email: "test@test.com",
        password: "Test@123",
      },
    });

    expect(request.statusCode).toEqual(400);
    expect(request.body).toEqual({
      message:
        "InvalidParamError[name]: The name must not contain any numbers.",
    });
  });

  it("shold return 400 if email is not provided", async () => {
    const request = await sut.handle({
      body: {
        name: "tests",
        email: "",
        password: "Test@123",
      },
    });

    expect(request.statusCode).toEqual(400);
    expect(request.body).toEqual({
      message: "InvalidParamError[email]: Invalid email",
    });
  });

  it("should return 400 if the provided email has an invalid format", async () => {
    const request = await sut.handle({
      body: {
        name: "tests",
        email: "test@test",
        password: "Test@123",
      },
    });

    expect(request.statusCode).toEqual(400);
    expect(request.body).toEqual({
      message: "InvalidParamError[email]: Invalid email",
    });
  });

  it("shold return 400 if password is not provided", async () => {
    const request = await sut.handle({
      body: {
        name: "tests",
        email: "test@test.com",
        password: "",
      },
    });

    expect(request.statusCode).toEqual(400);
    expect(request.body).toEqual({
      message:
        "InvalidParamError[password]: String must contain at least 8 character(s)",
    });
  });

  it("should return 400 if the provided password does not have 8 at least 8 characters", async () => {
    const request = await sut.handle({
      body: {
        name: "tests",
        email: "test@test.com",
        password: "test123",
      },
    });

    expect(request.statusCode).toEqual(400);
    expect(request.body).toEqual({
      message:
        "InvalidParamError[password]: String must contain at least 8 character(s)",
    });
  });

  it("should return 400 if the password provided does not meet the requirements for password security", async () => {
    const request = await sut.handle({
      body: {
        name: "tests",
        email: "test@test.com",
        password: "test1234",
      },
    });

    expect(request.statusCode).toEqual(400);
    expect(request.body).toEqual({
      message:
        "InvalidParamError[password]: The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    });
  });
});
