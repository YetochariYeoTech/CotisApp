import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { config } from "../config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  let jwtPayload;

  if (!token) {
    return res.status(401).send({ message: "Missing token" });
  }

  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    req.user = jwtPayload;
  } catch (error) {
    return res.status(401).send({ message: "Invalid or expired token" });
  }

  // Refresh the token to extend the session
  const { userId, email, role } = jwtPayload;
  const newToken = jwt.sign({ userId, email, role }, config.jwtSecret, {
    expiresIn: "1h",
  });
  res.cookie("token", newToken, { httpOnly: true });

  next();
};
