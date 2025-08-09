import express from "express";
import mongoose from "mongoose";
import userRoutes from "../routes/userRoutes";

const app = express();

app.use(express.json());

// Routes
app.use("/users", userRoutes);

mongoose.connect("mongodb://localhost:27017/hackathon")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => console.error(err));
