import { userRepository as user } from "../repositories/userRepository.js";

import mongoose from "mongoose";

export const userService = {
  async loginUser(email: string, password: string) {
    const data = await user.loginUser(email, password);
    return data;
  },

  async signupUser(email: string, password: string) {
    const data = await user.signupUser(email, password);
    return data;
  }
}