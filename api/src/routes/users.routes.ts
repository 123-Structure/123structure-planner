import express from "express";
import { loginUser, signUpUser } from "../controllers/user.controllers";

const usersRouter = express.Router();

// Login user
usersRouter.post("/login", loginUser);

// signUp user
usersRouter.post("/signUp", signUpUser);

export default usersRouter;
