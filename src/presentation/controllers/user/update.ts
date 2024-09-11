import { InvalidCredentialsError } from "@/domain/erros/invalid-credentials-error.js";
import { User } from "@/domain/models/user.js";
import { UpdateUseCase } from "@/domain/use-cases/user/update.js";
import { created } from "@/presentation/helpers/http-helper.js";
import { Controller } from "@/presentation/protocols/controller.js";
import { HttpRequest, HttpResponse } from "@/presentation/protocols/http.js";
import { UserValidator } from "@/presentation/protocols/user-validator.js";

type UpdateRequest = Pick<User, "name" | "email">;

type UpdateResponse = { message: string };

export class UpdateController
  implements Controller<UpdateRequest, UpdateResponse>
{
  constructor(
    private readonly userValidator: UserValidator,
    private readonly updateuseCase: UpdateUseCase
  ) {}

  async handle(
    HttpRequest: HttpRequest<UpdateRequest>
  ): Promise<HttpResponse<UpdateResponse>> {
    const paramsId = HttpRequest.params?.id;

    if (!paramsId) {
      throw new InvalidCredentialsError("UserId", "Required");
    }

    const { id, name, email } = this.userValidator.update({
      id: paramsId,
      ...HttpRequest.body,
    });

    await this.updateuseCase.execute({ id, name, email });

    return created<UpdateResponse>({
      message: "deu bom",
    });
  }
}
