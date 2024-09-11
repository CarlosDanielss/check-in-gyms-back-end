export class InvalidCredentialsError extends Error {
  public statusCode: number;

  constructor(paramName: string, message: string) {
    super(`Invalid credentials[${paramName}]: ${message}`);
    this.name = "InvalidCredentialsError";
    this.statusCode = 400;
  }
}
