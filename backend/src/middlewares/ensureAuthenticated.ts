import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(" ");
  try {
    const { sub } = verify(token, "23775d785fc9ab06d7005a4f54894509") as IPayload;

    request.user_id = sub;

    return next();
  } catch (e) {
    return response.status(401).end();
  }
}
