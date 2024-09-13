import { User } from "@/domain/models/user.js";

import { Controller } from "@/presentation/protocols/controller.js";
import { UserValidator } from "@/presentation/protocols/user-validator.js";
import { HttpRequest, HttpResponse } from "@/presentation/protocols/http.js";

import { ReadUseCase } from "@/domain/use-cases/user/read.js";

import { InvalidCredentialsError } from "@/domain/erros/invalid-credentials-error.js";
import { sucess } from "@/presentation/helpers/http-helper.js";

type ReadRequest = null;

type ReadResponse = User[];

export class ReadController implements Controller<ReadRequest, ReadResponse> {
  constructor(
    private readonly userValidator: UserValidator,
    private readonly readUseCase: ReadUseCase
  ) {}

  async handle(
    HttpRequest: HttpRequest<ReadRequest>
  ): Promise<HttpResponse<ReadResponse>> {
    const querypage = HttpRequest.query?.page as string;

    if (!querypage) {
      throw new InvalidCredentialsError("Page", "Required");
    }

    const { page } = this.userValidator.read(querypage);

    const result = await this.readUseCase.execute({ page });

    return sucess<ReadResponse>(result);
  }
}
