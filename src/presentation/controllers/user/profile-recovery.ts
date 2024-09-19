import { User } from "@/domain/models/user.js";

import { Controller } from "@/presentation/protocols/controller.js";
import { HttpRequest, HttpResponse } from "@/presentation/protocols/http.js";
import { UserValidator } from "@/presentation/protocols/user-validator.js";

import { GetUserProfileUseCase } from "@/domain/use-cases/user/get-user-profile.js";
import { success } from "@/presentation/helpers/http-helper.js";

type ProfileRecoveryRequest = null;

type ProfileRecoveryParams = { id: string };

type ProfileRecoveryResponse = Omit<User, "password" | "created_at">;

export class ProfileRecoveryController
  implements Controller<ProfileRecoveryRequest, ProfileRecoveryResponse>
{
  constructor(
    private readonly userValidator: UserValidator,
    private readonly getUserProfileUseCase: GetUserProfileUseCase
  ) {}

  async handle(
    HttpRequest: HttpRequest<null>
  ): Promise<HttpResponse<ProfileRecoveryResponse>> {
    const paramsId = HttpRequest.params as ProfileRecoveryParams;

    const { id } = this.userValidator.profileRecovery(paramsId);

    const result = await this.getUserProfileUseCase.execute({ id });

    return success<ProfileRecoveryResponse>(result);
  }
}
