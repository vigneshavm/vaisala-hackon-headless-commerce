// src/routes/userRoutes.ts
import { Router } from "express";
import * as userController from "../controllers/userController";

const userRoutes = Router();

console.log("✅ userRoutes.ts loaded");

// Create a new user
userRoutes.post("/", userController.createUserHandler);

// Login user
userRoutes.post("/login", userController.loginUserHandler);

// Get user by ID
userRoutes.get("/:id", userController.getUserHandler);

export default userRoutes;
