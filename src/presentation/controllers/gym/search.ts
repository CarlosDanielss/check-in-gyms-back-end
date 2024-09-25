import { InvalidCredentialsError } from "@/domain/erros/invalid-credentials-error.js";
import { Gym } from "@/domain/models/gym.js";
import { SearchUseCase } from "@/domain/use-cases/gym/search.js";
import { success } from "@/presentation/helpers/http-helper.js";
import { Controller } from "@/presentation/protocols/controller.js";
import { GymValidator } from "@/presentation/protocols/gym-validator.js";
import { HttpRequest, HttpResponse } from "@/presentation/protocols/http.js";

interface SearchRequest {
  query: string;
  page: string;
}

type SearchResponse = Gym[];

export class SearchController
  implements Controller<SearchRequest, SearchResponse>
{
  constructor(
    private readonly gymValidator: GymValidator,
    private readonly searchUseCase: SearchUseCase
  ) {}

  async handle(
    HttpRequest: HttpRequest<SearchRequest>
  ): Promise<HttpResponse<SearchResponse>> {
    const queryParam = HttpRequest.query?.query as string;
    const pageParam = HttpRequest.query?.page as string;

    if (!queryParam || !pageParam) {
      throw new InvalidCredentialsError("query and page", "Required");
    }

    const { query, page } = this.gymValidator.search({
      query: queryParam,
      page: pageParam,
    });

    const result = await this.searchUseCase.execute({ query, page });

    return success<SearchResponse>(result);
  }
}
