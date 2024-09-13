import { User } from "@/domain/models/user.js";

export type UserRepositorySearchMany = Partial<
  Pick<User, "name" | "email" | "role">
>;

export type UserRepositoryUpdate = Pick<User, "id"> &
  Partial<Pick<User, "name" | "email">>;

export type UserRepositoryCreate = Pick<User, "name" | "email" | "password"> &
  Partial<Pick<User, "role">>;

export interface UserRepository {
  searchMany(page: number, query?: UserRepositorySearchMany): Promise<User[]>;
  update(user: UserRepositoryUpdate): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: UserRepositoryCreate): Promise<User>;
}
