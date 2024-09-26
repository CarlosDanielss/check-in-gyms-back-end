import { ContentNotFount } from "@/domain/erros/content-not-found.js";
import { Gym } from "@/domain/models/gym.js";
import { GymRepository } from "@/domain/protocols/gym-repository.js";
import { UseCase } from "@/domain/protocols/use-case.js";

interface SearchInput {
  query: string;
  page: number;
}

type SearchOuput = Gym[];

export class SearchUseCase implements UseCase<SearchInput, SearchOuput> {
  constructor(private readonly gymRepository: GymRepository) {}

  async execute({ query, page }: SearchInput): Promise<SearchOuput> {
    const gyms = await this.gymRepository.findMany(query, page);

    if (gyms.length === 0) {
      throw new ContentNotFount("gym");
    }

    return gyms;
  }
}
