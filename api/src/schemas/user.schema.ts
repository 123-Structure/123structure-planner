import { Schema } from "mongoose";
import { IRessource } from "../data/interfaces/IRessource";

export const userSchema = new Schema<IRessource>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    role: {
      type: [String],
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index(
  {
    email: "text",
    firstName: "text",
    lastName: "text",
  },
  { default_language: "french" }
);
