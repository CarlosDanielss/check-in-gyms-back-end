import { SearchUseCase } from "@/domain/use-cases/gym/search.js";
import { InMemoryGymRepository } from "@/infra/database/in-memory/in-memory-gym-repository.js";
import { SearchController } from "./search.js";
import { GymValidatorAdapter } from "@/infra/validations/gym-validator-adapter.js";

export function SearchControllerFactory() {
  const gymRepository = new InMemoryGymRepository();
  const searchUseCase = new SearchUseCase(gymRepository);
  const gymValidator = new GymValidatorAdapter();
  const searchController = new SearchController(gymValidator, searchUseCase);

  return searchController;
}
