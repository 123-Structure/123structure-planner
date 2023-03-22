import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { IJwtPayload } from "../data/interfaces/IJwtPayload";
import User from "../models/user.models";

interface AuthenticatedRequest extends Request {
  user?: {
    _id: string;
  };
}

export const requireAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  // Check authentication status
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ msg: "⛔ Authorization token required" });
  }

  const token = authorization.split(" ")[1];
  try {
    const jwtSecret = process.env.JWT_SECRET as string;
    const { _id } = verify(token, jwtSecret) as IJwtPayload;

    const user = await User.findOne({ _id }).select("_id");

    if (!user) {
      return res.status(401).json({ msg: "⛔ Request is not authorized" });
    }
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ msg: "⛔ Request is not authorized" });
  }
};
