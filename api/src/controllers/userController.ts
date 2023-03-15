import { Request, Response } from "express";
import { userService } from "../services/userService.js";
import createToken from "../utils/createToken.js";

export const userController = {
  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body as { email: string; password: string };
    try {
      const user = await userService.loginUser(email, password);
      const token = createToken(user._id);
      res.status(200).json({ email, token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Something went wrong..." });
      }
    }
  },
  async signupUser(req: Request, res: Response) {
    const { email, password } = req.body as { email: string; password: string };
    try {
      const user = await userService.signupUser(email, password);
      const token = createToken(user._id);
      res.status(200).json({ email, token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Something went wrong..." });
      }
    }
  },
};
