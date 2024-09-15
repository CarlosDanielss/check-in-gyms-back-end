import jwt, {
  JwtPayload as JwtLibPayload,
  SignOptions,
  VerifyOptions,
} from "jsonwebtoken";

export interface Jwt {
  generateToken(payload: JwtLibPayload, options?: SignOptions): string;
  verifyToken(token: string, options?: VerifyOptions): JwtLibPayload | null;
  decodeToken(token: string, options?: jwt.DecodeOptions): JwtLibPayload | null;
}
