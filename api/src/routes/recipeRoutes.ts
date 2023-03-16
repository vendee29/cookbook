import express, { Router } from "express";
import { recipeController } from "../controllers/recipeController.js";
import { auth } from "../middleware/auth.js";

export const router: Router = express.Router();

// GET all recipes
router.get("/all", recipeController.getAllPublicRecipes);

router.use(auth);

// GET all user's recipes
router.get("/", recipeController.getRecipes);

// GET all tags
router.get("/tags", recipeController.getAllTags);

// GET a single recipe
router.get("/:id", recipeController.getRecipe);

// POST a new recipe
router.post("/", recipeController.createRecipe);

// DELETE a recipe
router.delete("/:id", recipeController.deleteRecipe);

// UPDATE a recipe
router.put("/:id", recipeController.updateRecipe);

// RATE a recipe
router.patch("/:id", recipeController.rateRecipe);

