import { userRepository } from "../repositories/userRepository.js";

export const userService = {
  async loginUser(email: string, password: string) {
    const data = await userRepository.loginUser(email, password);
    return data;
  },

  async signupUser(email: string, password: string) {
    const data = await userRepository.signupUser(email, password);
    return data;
  }
}