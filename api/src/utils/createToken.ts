import jwt from "jsonwebtoken";

const createToken = (_id: string): string => {
    if (!process.env.SECRET) {
      throw new Error("SECRET environment variable is not defined");
    }
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
  };

export default createToken;