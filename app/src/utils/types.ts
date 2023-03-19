export interface CreatedRecipe {
  title?: string;
  description?: string;
  img?: string;
  ingredients?: { ingredient: string; amount: string }[];
  private?: boolean;
  servings?: number;
  steps?: string;
  tags?: { label: string }[];
  time?: string;
}

export interface RecipeValue extends CreatedRecipe {
  _id: string;
  rating?: { user_id: string; rating: number }[];
  user_id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type User = {
  email: string;
  token: string;
  id: string;
};