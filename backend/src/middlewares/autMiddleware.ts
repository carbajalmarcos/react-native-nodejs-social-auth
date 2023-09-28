import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../auth/jwtUtils";

// Middleware de autenticación JWT
export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401); // missing token

  verifyToken(token, (err, user) => {
    if (err) return res.sendStatus(403); // invalid token
    req.user = user; //  User id or user data will be able in req user
    next();
  });
};
