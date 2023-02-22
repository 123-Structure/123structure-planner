import { Schema } from "mongoose";

export const projectGoalSchema = new Schema({
  year: {
    type: Number,
    required: true,
  },
  goal: {
    type: Number,
    required: true,
  },
});
