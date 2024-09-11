import { User } from "@/domain/models/user.js";

export type UserRepositoryCreate = Pick<User, "name" | "email" | "password"> &
  Partial<Pick<User, "role">>;

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(user: UserRepositoryCreate): Promise<User>;
}
