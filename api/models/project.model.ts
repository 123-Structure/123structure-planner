import mongoose from "mongoose";
import { projectSchema } from "../schemas/project.schema";

export default mongoose.model("Project", projectSchema);
