import mongoose from "mongoose";
import { Recipe } from "../models/recipeModel.js";
import { RecipeValue } from "../utils/types.js";

export const recipesRepository = {
  async getAllPublicRecipes(searchTerm: string | undefined) {
    if (searchTerm === undefined || searchTerm.trim().length === 0) {
      const recipes = await Recipe.find({ private: false }).sort({
        createdAt: -1,
      });
      return recipes;
    } else {
      const recipes = await Recipe.find({
        $and: [
          {
            $or: [
              { title: { $regex: searchTerm, $options: "i" } },
              { description: { $regex: searchTerm, $options: "i" } },
              { steps: { $regex: searchTerm, $options: "i" } },
              { "tags.label": { $regex: searchTerm, $options: "i" } },
            ],
          },
          { private: false },
        ],
      }).exec();
      return recipes;
    }
  },

  // get all recipes of one user
  async getRecipes(user_id: string, searchTerm: string | undefined) {
    if (searchTerm === undefined) {
      const recipes = await Recipe.find({ user_id }).sort({ createdAt: -1 }); // desc order
      return recipes;
    } else {
      const recipes = await Recipe.find({
        $and: [
          { "tags.label": { $regex: searchTerm, $options: "i" } },
          { user_id },
        ],
      }).exec();
      return recipes;
    }
  },

  // get a single recipe
  async getRecipe(id: string, user_id: string) {
    const recipe = await Recipe.findById(id, user_id);
    return recipe;
  },

  // create a new recipe
  async createRecipe(recipe: RecipeValue) {
    const createdRecipe = await Recipe.create(recipe);
    return createdRecipe;
  },

  // delete a recipe
  async deleteRecipe(id: string, user_id: string) {
    const deletedRecipe = await Recipe.findOneAndDelete({
      _id: id,
      user_id: user_id,
    });
    return deletedRecipe;
  },

  // update a recipe
  async updateRecipe(recipe_id: string, recipe: RecipeValue, user_id: string) {
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { _id: recipe_id, user_id: user_id },
      { $set: recipe },
      { new: true }
    );
    return updatedRecipe;
  },

  // rate a recipe
  async rateRecipe(recipe_id: string, user_id: string, rating: number) {
    const recipe = await Recipe.findOne({
      _id: recipe_id,
      "rating.user_id": user_id,
    });

    // update existing rating from the user
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

      // add new rating from the user
    } else {
      const ratedRecipe = await Recipe.findOneAndUpdate(
        { _id: recipe_id },
        { $addToSet: { rating: { user_id: user_id, rating: rating } } },
        { new: true }
      );

      return ratedRecipe;
    }
  },

  //get all recipe tags
  async getAllTags() {
    const tags = await Recipe.distinct("tags.label", { private: false });
    return tags;
  },
};
