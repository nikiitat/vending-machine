import { NextFunction, Request, Response } from "express";

export default function errorHandler(
  err: Error & BadRequest,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);

  if (res.headersSent) {
    return next(err);
  }

  if (err.errorCode === "InvalidDataException") {
    return res.status(400).send(err);
  }
  return res.status(500).send("Internal server Error");
}

export class BadRequest extends Error {
  message: string;
  errorCode: string;

  constructor(message = "BadRequest", errorCode = "InvalidDataException") {
    super();
    this.message = message;
    this.errorCode = errorCode;
  }
}
