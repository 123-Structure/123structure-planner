import mongoose from "mongoose";
import {projectSchema} from "../schemas/project.schemas";

export default mongoose.model("Project", projectSchema);
