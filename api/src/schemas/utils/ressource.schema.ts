import { Schema } from "mongoose";
import { IRessource } from "../../data/interfaces/IRessource";

export const ressourceSchema = new Schema<IRessource>({
  _id: {
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
});
