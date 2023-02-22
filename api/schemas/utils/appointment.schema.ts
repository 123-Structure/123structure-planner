import { Schema } from "mongoose";

export const appointmentSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  contact: {
    type: [String],
    required: true,
  },
  location: {
    address: {
      type: String,
      required: true,
    },
    cp: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});