import { Response } from "express";
import { recipeService } from "../services/recipeService.js";
import { handleControllerError } from "../utils/handleControllerError.js";
import { UserRequest } from "../utils/types.js";

// get all public recipes
export const recipeController = {
  async getAllPublicRecipes(req: UserRequest, res: Response) {
    try {
      const searchTerm = req.query.q as string | undefined;
      const recipes = await recipeService.getAllPublicRecipes(searchTerm);
      res.status(200).json(recipes);
    } catch (err) {
      handleControllerError(res, err, "Error searching for recipes");
    }
  },

  // get all recipes of one user
  async getRecipes(req: UserRequest, res: Response) {
    try {
      const searchTerm = req.query.q as string | undefined;
      const user_id = req.user?._id;
      const recipes = await recipeService.getRecipes(user_id, searchTerm);
      res.status(200).json(recipes);
    } catch (err) {
      handleControllerError(res, err, "Error searching for recipes");
    }
  },

  // get a single recipe
  async getRecipe(req: UserRequest, res: Response) {
    try {
      const { id } = req.params;
      const user_id = req.user?._id;
      const recipe = await recipeService.getRecipe(id, user_id);
      res.status(200).json(recipe);
    } catch (err) {
      handleControllerError(res, err, "Error searching for the recipe");
    }
  },

  // create a new recipe
  async createRecipe(req: UserRequest, res: Response) {
    try {
      const recipe = req.body;
      const user_id = req.user?._id;
      const createdRecipe = await recipeService.createRecipe({
        user_id,
        ...recipe,
      });
      res.status(200).json(createdRecipe);
    } catch (err) {
      handleControllerError(res, err, "Error creating the recipe");
    }
  },

  // delete a recipe
  async deleteRecipe(req: UserRequest, res: Response) {
    try {
      const { id } = req.params;
      const user_id = req.user?._id;
      const deletedRecipe = await recipeService.deleteRecipe(id, user_id);
      res.status(200).json(deletedRecipe);
    } catch (err) {
      handleControllerError(res, err, "Error deleting the recipe");
    }
  },

  // update a recipe
  async updateRecipe(req: UserRequest, res: Response) {
    try {
      const { id } = req.params;
      const user_id = req.user?._id;
      const updatedRecipe = await recipeService.updateRecipe(
        id,
        req.body,
        user_id
      );
      res.status(200).json(updatedRecipe);
    } catch (err) {
      handleControllerError(res, err, "Error updating the recipe");
    }
  },

  // rate a recipe
  async rateRecipe(req: UserRequest, res: Response) {
    try {
      const { id } = req.params;
      const user_id = req.user?._id;
      const rating = req.body.rating;
      const ratedRecipe = await recipeService.rateRecipe(id, user_id, rating);
      res.status(200).json(ratedRecipe);
    } catch (err) {
      handleControllerError(res, err, "Error rating the recipe");
    }
  },

  // get all recipe tags
  async getAllTags(req: UserRequest, res: Response) {
    try {
      const tags = await recipeService.getAllTags();
      res.status(200).json(tags);
    } catch (err) {
      handleControllerError(res, err, "Error getting all tags");
    }
  },
};
