import { Router } from "express";
import * as userController from "../controllers/userController";

const router = Router();
console.log("user rotes .jas loaded");
router.post("/", userController.createUserHandler);
router.post("/login", userController.loginUserHandler);
router.get("/:id", userController.getUserHandler);

export default router;
