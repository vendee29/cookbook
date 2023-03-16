import { Request, Response } from "express";
import { Recipe } from "../models/recipeModel.js";
import { recipeService } from "../services/recipeService.js";
import { UserRequest } from "../utils/types.js";

import mongoose from "mongoose";

// get all public recipes
export const recipeController = {
  async getAllPublicRecipes(req: Request, res: Response) {
    try {
      const data = await recipeService.getAllPublicRecipes();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // get all recipes
  async getRecipes(req: UserRequest, res: Response) {
    const user_id = req.user?._id;
    const recipes = await recipeService.getRecipes(user_id);
    res.status(200).json(recipes);
  },

  // get a single recipe
  async getRecipe(req: UserRequest, res: Response) {
    const { id } = req.params;
    const user_id = req.user?._id;

    try {
      const recipe = await recipeService.getRecipe(id, user_id);
      res.status(200).json(recipe);
    } catch (error) {
      res.status(404).json(error);
    }
  },

  // create a new recipe
  async createRecipe(req: UserRequest, res: Response) {
    const recipe = req.body;
    const user_id = req.user?._id;
    try {
      const createdRecipe = await recipeService.createRecipe({
        user_id,
        ...recipe,
      });
      res.status(200).json(createdRecipe);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Something went wrong" });
      }
    }
  },

  // delete a recipe
  async deleteRecipe(req: UserRequest, res: Response) {
    const { id } = req.params;
    const user_id = req.user?._id;
    try {
      const deletedRecipe = await recipeService.deleteRecipe(id, user_id);
      res.status(200).json(deletedRecipe);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  // update a recipe

  async updateRecipe(req: UserRequest, res: Response) {
    const { id } = req.params;
    const user_id = req.user?._id;

    try {
      const updatedRecipe = await recipeService.updateRecipe(
        id,
        req.body,
        user_id
      );
      res.status(200).json(updatedRecipe);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  // // rate a recipe

  async rateRecipe(req: UserRequest, res: Response) {
    const { id } = req.params;
    const user_id = req.user?._id;
    const rating = req.body.rating;
    try {
      const ratedRecipe = await recipeService.rateRecipe(id, user_id, rating);
      res.status(200).json(ratedRecipe);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  async getAllTags(req: UserRequest, res: Response) {
    try {
      const tags = await recipeService.getAllTags();
      res.status(200).json(tags);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
