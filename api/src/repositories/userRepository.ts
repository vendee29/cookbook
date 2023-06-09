import { User } from "../models/userModel.js";

export const userRepository = {
  async loginUser(email: string, password: string) {
    const user = await User.login(email, password);
    return user;
  },

  async signupUser(email: string, password: string) {
    const user = await User.signup(email, password);
    return user;
  },
};
