import { Request } from "express";
import { Types } from "mongoose";
import { UserValue } from "../models/userModel.js";

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

export interface UserRequest extends Request {
  user?: UserValue & {
    _id: Types.ObjectId;
};
}
