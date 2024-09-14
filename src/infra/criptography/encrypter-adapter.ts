import bcrypt from "bcrypt";

import { Encrypter } from "@/domain/protocols/encrypter.js";

export class EncrypterAdapter implements Encrypter {
  private readonly salt: number;

  constructor(salt = 10) {
    this.salt = salt;
  }

  async encrypt(value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash);
  }
}
