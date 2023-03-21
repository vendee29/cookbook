import mongoose from "mongoose";
import { recipesRepository } from "../repositories/recipesRepository.js";
import { RecipeValue } from "../utils/types.js";

export const recipeService = {
  async getAllPublicRecipes(searchTerm: string | undefined) {
    try {
      const foundRecipes = await recipesRepository.getAllPublicRecipes(
        searchTerm
      );
      if (!foundRecipes) return [];
      return foundRecipes;
    } catch (error) {
      throw new Error("Something went wrong, no recipes were found");
    }
  },

  async getRecipes(user_id: string, searchTerm: string | undefined) {
    try {
      const recipes = await recipesRepository.getRecipes(user_id, searchTerm);
      if (!recipes) return [];
      return recipes;
    } catch (error) {
      throw new Error("Something went wrong, no recipes were found");
    }
  },

  async getRecipe(id: string, user_id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("No such recipe");
    }
    try {
      const recipe = await recipesRepository.getRecipe(id, user_id);
      return recipe;
    } catch (error) {
      throw new Error("Something went wrong, no recipe was found");
    }
  },

  async createRecipe(recipe: RecipeValue) {
    if (
      !recipe.title ||
      recipe.title.trim().length === 0 ||
      !recipe.steps ||
      recipe.steps.trim().length === 0
    ) {
      throw new Error("Please fill in all the required fields");
    }

    try {
      const createdRecipe = await recipesRepository.createRecipe(recipe);
      return createdRecipe;
    } catch (error) {
      throw new Error("Something went wrong, no recipe was created");
    }
  },

  async deleteRecipe(id: string, user_id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("No such recipe");
    }
    try {
      const deletedRecipe = await recipesRepository.deleteRecipe(id, user_id);
      return deletedRecipe;
    } catch (error) {
      throw new Error("Something went wrong, the recipe was not deleted");
    }
  },

  async updateRecipe(recipe_id: string, recipe: RecipeValue, user_id: string) {
    if (!mongoose.Types.ObjectId.isValid(recipe_id)) {
      throw new Error("No such recipe");
    }
    try {
      const updatedRecipe = await recipesRepository.updateRecipe(
        recipe_id,
        recipe,
        user_id
      );
      return updatedRecipe;
    } catch (error) {
      throw new Error("Something went wrong, the recipe was not updated");
    }
  },

  async rateRecipe(
    recipe_id: string,
    user_id: string,
    rating: number | undefined
  ) {
    if (!mongoose.Types.ObjectId.isValid(recipe_id)) {
      throw new Error("No such recipe");
    }

    if (!rating || rating < 1 || rating > 5) {
      throw new Error("Please provide valid rating");
    }

    try {
      const ratedRecipe = await recipesRepository.rateRecipe(
        recipe_id,
        user_id,
        rating
      );
      return ratedRecipe;
    } catch (error) {
      throw new Error("Something went wrong, the recipe was not rated");
    }
  },

  async getAllTags() {
    try {
      const tags = await recipesRepository.getAllTags();
      if (!tags) {
        return [];
      }
      return tags;
    } catch (error) {
      throw new Error("Something went wrong, no tags were found");
    }
  },
};
