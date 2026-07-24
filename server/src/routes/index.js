import jwt from "jsonwebtoken";
import express from "express";
import authRouter from "./auth.js";
import UserModel from "../models/userModel.js"

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello Express!");
});

router.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "MediaVault API is running",
  });
});



router.use("/auth", authRouter);

router.get("/user",  (req, res) =>{
    res.send(UserModel.getUserByEmail("sofia@example.com"))
  }
)


export default router;