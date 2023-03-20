import { Schema } from "mongoose";
import { IProjectGoal } from "../../data/interfaces/IProjectGoal";

export const projectGoalSchema = new Schema<IProjectGoal>({
  year: {
    type: Number,
    required: true,
  },
  goal: {
    type: Number,
    required: true,
  },
});
