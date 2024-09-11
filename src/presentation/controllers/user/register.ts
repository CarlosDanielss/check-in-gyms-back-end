import { User } from "@/domain/models/user.js";

import { Controller } from "@/presentation/protocols/controller.js";
import { HttpRequest, HttpResponse } from "@/presentation/protocols/http.js";
import { UserValidator } from "@/presentation/protocols/user-validator.js";

import { RegisterUseCase } from "@/domain/use-cases/user/register.js";

import { created } from "@/presentation/helpers/http-helper.js";

type RegisterRequest = Pick<User, "name" | "email" | "password">;

type RegisterResponse = { message: string };

export class RegisterController
  implements Controller<RegisterRequest, RegisterResponse>
{
  constructor(
    private readonly userValidator: UserValidator,
    private readonly registerUseCase: RegisterUseCase
  ) {}

  async handle(
    HttpRequest: HttpRequest<RegisterRequest>
  ): Promise<HttpResponse<RegisterResponse>> {
    const { name, email, password } = this.userValidator.register(
      HttpRequest.body
    );

    await this.registerUseCase.execute({ name, email, password });

    return created<RegisterResponse>({
      message: "user created successfully",
    });
  }
}
