import { User } from "@/domain/models/user.js";

import { Controller } from "@/presentation/protocols/controller.js";
import { HttpRequest, HttpResponse } from "@/presentation/protocols/http.js";
import { UserValidator } from "@/presentation/protocols/user-validator.js";
import { Jwt } from "@/presentation/protocols/jwt.js";

import { AuthenticateUseCase } from "@/domain/use-cases/user/authenticate.js";

import { sucess } from "@/presentation/helpers/http-helper.js";

type AuthenticateRequest = Pick<User, "email" | "password">;

type AuthenticateResponse = null;

export class AuthenticateController
  implements Controller<AuthenticateRequest, AuthenticateResponse>
{
  constructor(
    private readonly userValidator: UserValidator,
    private readonly authenticateUseCase: AuthenticateUseCase,
    private readonly token: Jwt
  ) {}

  async handle(
    HttpRequest: HttpRequest<AuthenticateRequest>
  ): Promise<HttpResponse<AuthenticateResponse>> {
    const { email, password } = this.userValidator.authenticate(
      HttpRequest.body
    );

    const user = await this.authenticateUseCase.execute({ email, password });

    const token = this.token.generateToken(
      { role: user.role },
      {
        subject: user.id,
        expiresIn: "1h",
      }
    );

    const refreshToken = this.token.generateToken(
      { role: user.role },
      {
        subject: user.id,
        expiresIn: "7d",
      }
    );

    return sucess<AuthenticateResponse>(null, {
      token,
      refreshToken,
    });
  }
}
