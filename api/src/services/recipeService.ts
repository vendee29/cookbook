import { recipesRepository as recipes } from "../repositories/recipesRepository.js";
import { RecipeValue } from "../utils/types.js";
import mongoose from "mongoose";

export const recipeService = {
  async getAllPublicRecipes() {
    const data = await recipes.getAllPublicRecipes();
    return data;
  },

  async getRecipes(user_id: any) {
    const data = await recipes.getRecipes(user_id);
    return data;
  },

  async getRecipe(id: any, user_id: any) {
    const recipe = await recipes.getRecipe(id, user_id);
    if (!recipe) {
      throw new Error("No such recipe");
    }
    return recipe;
  },

  async createRecipe(recipe: RecipeValue) {
    let emptyFields: string[] = [];

    if (!recipe.title) {
      emptyFields.push("title");
    }
    if (!recipe.ingredients || recipe.ingredients.length < 1) {
      emptyFields.push("ingredients");
    }
    if (!recipe.steps) {
      emptyFields.push("steps");
    }
    if (emptyFields.length > 0) {
      return {
        error: "Please fill in all the fields",
        emptyFields: emptyFields,
      };
    }
    try {
      const createdRecipe = await recipes.createRecipe(recipe);
      return createdRecipe;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Something went wrong");
      }
    }
  },

  async deleteRecipe(id: any, user_id: any) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("No such recipe");
    }
    const deletedRecipe = await recipes.deleteRecipe(id, user_id);
    if (!deletedRecipe) {
      throw new Error("No such recipe");
    }
    return deletedRecipe;
  },

  async updateRecipe(recipe_id: any, recipe: any, user_id: any) {
    if (!mongoose.Types.ObjectId.isValid(recipe_id)) {
      throw new Error("No such recipe");
    }
    const updatedRecipe = await recipes.updateRecipe(recipe_id, recipe, user_id);
    if (!updatedRecipe) {
      throw new Error("No such recipe");
    }
    return updatedRecipe;
  },

  async rateRecipe(recipe_id: any, user_id: any, rating: number) {
    if (!mongoose.Types.ObjectId.isValid(recipe_id)) {
      throw new Error("No such recipe");
    }

    const ratedRecipe = await recipes.rateRecipe(recipe_id, user_id, rating);

    if (!ratedRecipe) {
      throw new Error("No such recipe");
    }
    return ratedRecipe;
  },

  async getAllTags() {
    const tags = await recipes.getAllTags();
    if(!tags) {
      return [];
    }
    return tags;
  }
};
