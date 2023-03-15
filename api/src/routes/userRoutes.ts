import express, { Router } from "express";
import { userController } from "../controllers/userController.js";

export const router = Router();

// login route
router.post('/login', userController.loginUser)

// signup route
router.post('/signup', userController.signupUser)