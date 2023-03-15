import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const Schema = mongoose.Schema;

export interface UserValue extends mongoose.Document {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserValue> {
  signup(email: string, password: string): Promise<UserValue>;
  login(email: string, password: string): Promise<UserValue>;
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static signup method
userSchema.statics.signup = async function (email: string, password: string) {
  // validation
  if (!email || !password) {
    throw new Error("All fields must be filled");
  }
  if (!validator.default.isEmail(email)) {
    throw new Error("Email is not valid");
  }

  if (!validator.default.isStrongPassword(password)) {
    throw new Error("Password not strong enough");
  }

  const exists: UserValue | undefined = await this.findOne({ email });
  if (exists) {
    throw new Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

// static login
userSchema.statics.login = async function (email: string, password: string) {
  if (!email || !password) {
    throw new Error("All fields must be filled");
  }

  const user: UserValue | undefined = await this.findOne({ email });
  if (!user) {
    throw new Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if(!match) {
    throw new Error("Incorrect password");
  }
  return user;
};

export const User = mongoose.model<UserValue, UserModel>("User", userSchema);
