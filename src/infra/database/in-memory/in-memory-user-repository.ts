import { randomUUID } from "node:crypto";

import { User } from "@/domain/models/user.js";

import {
  UserRepository,
  UserRepositoryCreate,
} from "@/domain/protocols/user-repository.js";

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create({
    name,
    email,
    password,
    role = "MEMBER",
  }: UserRepositoryCreate): Promise<User> {
    const user: User = {
      id: randomUUID(),
      name,
      email,
      password,
      role,
      created_at: new Date(),
    };

    this.items.push(user);

    return user;
  }
}
