import jwt from "jsonwebtoken";

import {
  DecodeOptions,
  Jwt,
  JwtPayload,
  TokenOptions,
} from "@/presentation/protocols/jwt.js";

export class TokenAdapter implements Jwt {
  constructor(private readonly secret: string) {}

  generateToken(payload: JwtPayload<{}>, options?: TokenOptions): string {
    return jwt.sign(payload, this.secret, options)
  }
  verifyToken(token: string, options?: TokenOptions): JwtPayload<{}> | null {
    throw new Error("Method not implemented.");
  }
  decodeToken(token: string, options?: DecodeOptions): JwtPayload<{}> | null {
    throw new Error("Method not implemented.");
  }
}
