import { Request, Response } from "express";
import User from "../models/user.models";
import bcrypt from "bcrypt";
import validator from "validator";

// Login user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  res.status(200).json({ msg: "Login User" });
};

// SignIn User
export const signUpUser = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, role, company } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "⛔ All fields must be filled" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "⛔ Email is not valid" });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ error: "⛔ Password not strong enough" });
    }

    const exist = await User.findOne({ email });

    if (exist) {
      return res.status(400).json({ error: "⛔ Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await User.create({
      email,
      password: hash,
      firstName,
      lastName,
      role,
      company,
    });
    res.status(200).json({
      email,
      password: hash,
      firstName,
      lastName,
      role,
      company,
    });
  } catch (error: any) {
    res.status(400).json({ error: "⛔ " + error.message });
  }
};
