import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { recipeController } from "../controllers/recipeController.js";

export const router = Router();

router.use(auth);

// GET all recipes
router.get("/all", recipeController.getAllPublicRecipes);

// GET all user's recipes
router.get("/me", recipeController.getRecipes);

// GET all recipe tags
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
