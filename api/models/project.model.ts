import mongoose, { Schema } from "mongoose";

const Project = mongoose.Schema;

const projectSchema = new Schema(
  {
    DOSSIER: {
      type: String,
      required: true,
    },

    AFFAIRE: {
      type: String,
      required: true,
    },

    CLIENT: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Project", projectSchema);
