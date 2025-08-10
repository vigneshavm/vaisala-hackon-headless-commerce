import { Router } from "express";
import * as userController from "../controllers/userController";

const userRoutes = Router();

// rohithkksmy@example.com  // password: rohithkksmy 

// Create a new user with validation
userRoutes.post("/", userController.createUserHandler);

// Login user with validation
userRoutes.post("/login",  userController.loginUserHandler);

// Get user by ID
userRoutes.get("/:id", userController.getUserHandler);

export default userRoutes;
