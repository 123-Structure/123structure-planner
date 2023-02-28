import { Schema } from "mongoose";

export const projectSchema = new Schema(
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
