export class AlreadyExists extends Error {
  public statusCode: number;

  constructor(paramName: string) {
    super(`${paramName} already exists`);
    this.name = "AlreadyExists";
    this.statusCode = 409;
  }
}
