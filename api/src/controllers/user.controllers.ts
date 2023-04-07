import { Request, Response } from "express";
import User from "../models/user.models";
import bcrypt from "bcrypt";
import validator from "validator";
import { sign } from "jsonwebtoken";
import { IJwtPayload } from "../data/interfaces/IJwtPayload";
import { IRessource } from "../data/interfaces/IRessource";

// Generate JWT
const generateToken = (payload: IJwtPayload) => {
  const jwtSecret = process.env.JWT_SECRET as string;
  // return sign(payload, jwtSecret, { expiresIn: 10 });
  return sign(payload, jwtSecret, { expiresIn: 60 * 60 * 24 }); // 24 heures
};

// Login user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "⛔ All fields must be filled" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Utilisateur inconnu" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ error: "Mot de passe erronée" });
    }

    // Generate new token
    const token = generateToken({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      company: user.company,
    });

    res.status(200).json({
      email,
      token,
    });
  } catch (error: any) {
    res.status(400).json({ error: "⛔ " + error.message });
  }
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

    const user = await User.create({
      email,
      password: hash,
      firstName,
      lastName,
      role,
      company,
    });

    // Generate new token
    const token = generateToken({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      company: user.company,
    });

    res.status(200).json({
      email,
      token,
    });
  } catch (error: any) {
    res.status(400).json({ error: "⛔ " + error.message });
  }
};

// Get All user by role
export const getUsersByRole = async (req: Request, res: Response) => {
  const { role } = req.params;

  const users = await User.find({ role: role }).sort({ createdAt: -1 });

  const usersObject = JSON.parse(JSON.stringify(users)) as IRessource[];

  const result = usersObject.map((user) => {
    return {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };
  });

  res.status(200).json(result);
};
