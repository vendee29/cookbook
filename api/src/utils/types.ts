import { Request } from "express";
import { Types } from "mongoose";
import mongoose from "mongoose";

export interface RecipeValue {
  title?: string;
  description?: string;
  img?: string;
  ingredients?: { ingredient: string; amount: string }[];
  private?: boolean;
  rating?: { user_id: string; rating: number }[];
  servings?: number;
  steps?: string;
  tags?: { label: string }[];
  time?: string;
  user_id?: string;
}

export interface UserValue extends mongoose.Document {
  email: string;
  password: string;
}

export interface UserRequest extends Request {
  user?: UserValue & {
    _id: Types.ObjectId;
  };
}
