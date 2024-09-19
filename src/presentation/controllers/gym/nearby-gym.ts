import { Gym } from "@/domain/models/gym.js";

import { Controller } from "@/presentation/protocols/controller.js";
import { HttpRequest, HttpResponse } from "@/presentation/protocols/http.js";
import { GymValidator } from "@/presentation/protocols/gym-validator.js";

import { NearbyGymUseCase } from "@/domain/use-cases/gym/nearby-gym.js";
import { success } from "@/presentation/helpers/http-helper.js";

interface NearbyGymRequest {
  latitude: number;
  longitude: number;
}

type NearbyGymResponse = Gym[];

export class NearbyGymController
  implements Controller<NearbyGymRequest, NearbyGymResponse>
{
  constructor(
    private readonly gymValidator: GymValidator,
    private readonly nearbyGymUseCase: NearbyGymUseCase
  ) {}

  async handle(
    HttpRequest: HttpRequest<NearbyGymRequest>
  ): Promise<HttpResponse<NearbyGymResponse>> {
    const { latitude, longitude } = this.gymValidator.nearbyGym(
      HttpRequest.body
    );

    const result = await this.nearbyGymUseCase.execute({ latitude, longitude });

    return success<NearbyGymResponse>(result);
  }
}
