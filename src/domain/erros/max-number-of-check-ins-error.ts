export class MaxNumberOfCheckInsError extends Error {
  public statusCode: number;

  constructor(message = "Max number of check-ins reached.") {
    super(message);
    this.name = "MaxNumberOfCheckInsError";
    this.statusCode = 400;
  }
}
