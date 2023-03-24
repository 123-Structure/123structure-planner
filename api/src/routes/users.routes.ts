import express from "express";
import {
  getUsersByRole,
  loginUser,
  signUpUser,
} from "../controllers/user.controllers";

const usersRouter = express.Router();
// Login user
usersRouter.post("/login", loginUser);

// signUp user
usersRouter.post("/signUp", signUpUser);

// Get all users by role
usersRouter.get("/:role", getUsersByRole)

export default usersRouter;
