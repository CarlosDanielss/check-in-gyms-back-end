export class ContentNotFount extends Error {
  public statusCode: number;

  constructor(paramName: string) {
    super(`${paramName} not found`);
    this.name = "ContentNotFount";
    this.statusCode = 404;
  }
}
