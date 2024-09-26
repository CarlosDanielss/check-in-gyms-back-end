export class MaxDistanceError extends Error {
  public statusCode: number;

  constructor(message = "Max distance error") {
    super(message);
    this.name = "MaxDistanceError";
    this.statusCode = 400;
  }
}
