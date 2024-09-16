export class InvalidTokenError extends Error {
  public statusCode: number;

  constructor(message = "Invalid token") {
    super(message);
    this.name = "InvalidTokenError";
    this.statusCode = 401;
  }
}
