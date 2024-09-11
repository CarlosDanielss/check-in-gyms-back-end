import { User } from "@/domain/models/user.js";

import {
  UserRepository,
  UserRepositoryCreate,
  UserRepositoryUpdate,
} from "@/domain/protocols/user-repository.js";

import { prisma } from "./index.js";

export class DbUserRepository implements UserRepository {
  async update({ id, name, email }: UserRepositoryUpdate): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create({ name, email, password }: UserRepositoryCreate): Promise<User> {
    return await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }
}
