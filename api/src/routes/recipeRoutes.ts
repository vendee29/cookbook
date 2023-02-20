import express, { Router } from "express";

export const router: Router = express.Router();

// GET all recipes
router.get("/", getRecipes);

// GET a single recipe
router.get("/:id", getRecipe);

// POST a new recipe
router.post("/", createRecipe);

// DELETE a recipe
router.delete("/:id", deleteRecipe);

// UPDATE a recipe
router.put("/:id", updateRecipe);

// RATE a recipe
router.patch("/:id", rateRecipe);