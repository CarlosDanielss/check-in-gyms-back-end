import { InvalidTokenError } from "@/domain/erros/invalid-token-error.js";
import { Jwt } from "@/presentation/protocols/jwt.js";

import jwt, { JwtPayload } from "jsonwebtoken";

export class TokenAdapter implements Jwt {
  constructor(private readonly secret: string) {}

  generateToken(payload: jwt.JwtPayload, options?: jwt.SignOptions): string {
    return jwt.sign(payload, this.secret, options);
  }

  verifyToken(
    token: string,
    options?: jwt.VerifyOptions
  ): jwt.JwtPayload | null {
    try {
      return jwt.verify(token, this.secret, options) as JwtPayload;
    } catch {
      throw new InvalidTokenError();
    }
  }

  decodeToken(
    token: string,
    options?: jwt.DecodeOptions
  ): jwt.JwtPayload | null {
    return jwt.decode(token, options) as JwtPayload | null;
  }
}
