// src/routes/userRoutes.ts
import { Router } from "express";
import * as userController from "../controllers/userController";

const productRoutes = Router();

console.log("✅ userRoutes.ts loaded");

// Create a new user
productRoutes.post("/", userController.createUserHandler);

// Login user
productRoutes.post("/login", userController.loginUserHandler);

// Get user by ID
productRoutes.get("/:id", userController.getUserHandler);

export default productRoutes;
