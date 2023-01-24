export class InhibitorError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InhibitorError";
  }
}

export class ServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ServerError";
  }
}
