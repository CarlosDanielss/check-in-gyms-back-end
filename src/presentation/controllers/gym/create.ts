import { Gym } from "@/domain/models/gym.js";

import { Controller } from "@/presentation/protocols/controller.js";
import { GymValidator } from "@/presentation/protocols/gym-validator.js";
import { CreateUseCase } from "@/domain/use-cases/gym/create.js";
import { HttpRequest, HttpResponse } from "@/presentation/protocols/http.js";

import { created } from "@/presentation/helpers/http-helper.js";

type CreateRequest = Omit<Gym, "id" | "CheckIn">;

type CreateResponse = { message: string };

export class CreateController
  implements Controller<CreateRequest, CreateResponse>
{
  constructor(
    private readonly gymValidator: GymValidator,
    private readonly createUseCase: CreateUseCase
  ) {}

  async handle(
    HttpRequest: HttpRequest<CreateRequest>
  ): Promise<HttpResponse<CreateResponse>> {
    const { title, cnpj, description, phone, latitude, longitude } =
      this.gymValidator.create(HttpRequest.body);

    await this.createUseCase.execute({
      title,
      cnpj,
      description,
      phone,
      latitude,
      longitude,
    });

    return created<CreateResponse>({
      message: "gym created successfully",
    });
  }
}
