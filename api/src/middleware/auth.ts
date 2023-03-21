import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { UserRequest } from "../utils/types.js";

export const auth = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  // verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    if (process.env.SECRET) {
      const tokenPayload = jwt.verify(
        token,
        process.env.SECRET
      ) as jwt.JwtPayload;
      const _id: string = tokenPayload._id;
      const userId = await User.findOne({ _id }).select("_id");
      if (!userId) throw new Error("User was not found");
      req.user = userId;
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};