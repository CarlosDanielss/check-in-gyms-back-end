import { randomUUID } from "node:crypto";

import { User } from "@/domain/models/user.js";

import {
  UserRepository,
  UserRepositoryCreate,
  UserRepositoryUpdate,
} from "@/domain/protocols/user-repository.js";

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = [];

  async update({ id, ...data }: UserRepositoryUpdate): Promise<User> {
    const userIndex = this.items.findIndex((item) => item.id === id);

    const existingData = this.items[userIndex];

    const updateData = { ...existingData, ...data };

    this.items[userIndex] = updateData;

    return updateData;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

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
