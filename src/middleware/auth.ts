import { Request, Response, NextFunction } from "express";

export default function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const [user, pass] = Buffer.from(
      req.headers.authorization!.split(" ")[1],
      "base64"
    )
      .toString()
      .split(":");

    if (user === process.env.APIUSER && pass === process.env.PASS) next();
    else throw new Error();
  } catch (err) {
    res.status(403).send({ error: "Please authenticate" });
  }
}
