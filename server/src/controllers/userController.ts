import { Request, Response } from "express";
import * as userService from "../services/userServices";

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: String(error) });
    }
  }
};

export const loginUserHandler = async (req: Request, res: Response) => {
    console.log("loginUserHandler called", req.body);
    try {
      const { email, password } = req.body;
      console.log("Email:", email, "Password:", password);
  
      if (typeof email !== "string" || typeof password !== "string") {
        return res.status(400).json({ message: "Email and password are required and must be strings" });
      }
  
      const user = await userService.getUserByEmail(email);
      console.log(user, "user is ")
      if (!user || !user.password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      const isMatch = await (userService as any).comparePassword(password, user.password);

      
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      res.json({ message: "Login successful", user });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: String(error) });
      }
    }
  };
  

export const getUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: String(error) });
    }
  }
};
