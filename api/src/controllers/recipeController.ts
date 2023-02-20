import { Request, Response } from "express";
import { Recipe } from "../models/recipeModel.js";

import mongoose from "mongoose";

// get all recipes
export const getRecipes = async (req: Request, res: Response) => {
  const user_id = req.user?._id;
  const recipes = await Recipe.find({user_id}).sort({ createdAt: -1 }); // desc order

  res.status(200).json(recipes);
};

// get a single recipe
export const getRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such recipe" });
  }

  const recipe = await Recipe.findById(id);
  if (!recipe) {
    return res.status(404).json({ error: "No such recipe" });
  }

  res.status(200).json(recipe);
};

// create a new recipe
export const createRecipe = async (req: Request, res: Response) => {
  const { title, load, reps } = req.body;

  let emptyFields: string[] = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({
        error: "Please fill in all the fields",
        emptyFields: emptyFields,
      });
  }

  // add doc to db
  try {
    const user_id = req.user?._id
    const recipe = await Recipe.create({ title, load, reps, user_id });
    res.status(200).json(recipe);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "Something went wrong" });
    }
  }
};

// delete a recipe
export const deleteRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such recipe" });
  }

  const recipe = await Recipe.findOneAndDelete({ _id: id });

  if (!recipe) {
    return res.status(404).json({ error: "No such recipe" });
  }

  res.status(200).json(recipe);
};

// update a recipe

export const updateRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such recipe" });
  }

  const recipe = await Recipe.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!recipe) {
    return res.status(404).json({ error: "No such recipe" });
  }

  res.status(200).json(recipe);
};

// rate a recipe

export const rateRecipe = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such recipe" });
    }
  
    const recipe = await Recipe.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
  
    if (!recipe) {
      return res.status(404).json({ error: "No such recipe" });
    }
  
    res.status(200).json(recipe);
  };