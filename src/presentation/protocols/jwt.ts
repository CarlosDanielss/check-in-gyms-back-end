export enum Algorithm {
  "HS256",
  "HS384",
  "HS512",
  "RS256",
  "RS384",
  "RS512",
  "ES256",
  "ES384",
  "ES512",
  "PS256",
  "PS384",
  "PS512",
}

export interface JwtPayload<T = {}> {
  userId: string;
  additionalData?: T;
}

export interface TokenOptions {
  expiresIn?: string | number;
  algorithm?: Algorithm;
}

export interface DecodeOptions {
  json?: boolean;
}

export interface Jwt<T = {}> {
  generateToken(payload: JwtPayload<T>, options?: TokenOptions): string;
  verifyToken(token: string, options?: TokenOptions): JwtPayload<T> | null;
  decodeToken(token: string, options?: DecodeOptions): JwtPayload<T> | null;
}
