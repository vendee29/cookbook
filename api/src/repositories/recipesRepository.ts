import { Recipe } from "../models/recipeModel.js";
import mongoose from "mongoose";
import { RecipeValue } from "../utils/types.js";

export const recipesRepository = {
  async getAllPublicRecipes() {
    const recipes = await Recipe.find({ private: false }).sort({
      createdAt: -1,
    });
    return recipes;
  },

  // get all recipes of one user
  async getRecipes(user_id: string) {
    const recipes = await Recipe.find({ user_id }).sort({ createdAt: -1 }); // desc order
    return recipes;
  },

  // get a single recipe
  async getRecipe(id: any, user_id: any) {
    const recipe = await Recipe.findById(id, user_id);
    return recipe;
  },

  // create a new recipe
  async createRecipe(recipe: RecipeValue) {
    const createdRecipe = await Recipe.create(recipe);
    return createdRecipe;
  },

  // delete a recipe
  async deleteRecipe(id: any, user_id: any) {
    const deletedRecipe = await Recipe.findOneAndDelete({ _id: id, user_id: user_id });
    return deletedRecipe;
  },

  // update a recipe

  async updateRecipe(recipe_id: any, recipe: RecipeValue, user_id: any) {
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { _id: recipe_id, user_id: user_id },
      { $set: recipe },
      { new: true }
    );
    return updatedRecipe;
  },

  // rate a recipe

  async rateRecipe(recipe_id: any, user_id: any, rating: number) {
    const recipe = await Recipe.findOne({
      _id: recipe_id,
      "rating.user_id": user_id,
    });

    if (recipe && recipe.rating) {
      recipe.rating.forEach((r) => {
        if (
          r.user_id?.toString() ===
          new mongoose.Types.ObjectId(user_id).toString()
        ) {
          r.rating = rating;
        }
      });

      const ratedRecipe = await recipe.save();
      return ratedRecipe;
    } else {
      const ratedRecipe = await Recipe.findOneAndUpdate(
        { _id: recipe_id },
        { $addToSet: { rating: { user_id: user_id, rating: rating } } },
        { new: true }
      );

      return ratedRecipe;
    }
  },
};
