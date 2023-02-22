import { Schema } from "mongoose";
import { appointmentSchema } from "./utils/appointment.schema";
import { contactSchema } from "./utils/contact.schema";
import { projectGoalSchema } from "./utils/projectGoal.schema";
import { ressourceSchema } from "./utils/ressource.schema";

export const customerSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    group: {
      type: String,
      required: true,
    },
    name: {
      type: String,
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
    email: {
      type: String,
      required: true,
    },
    contact: {
      type: [contactSchema],
      required: true,
    },
    priceList: {
      type: String,
      required: true,
    },
    commercial: {
      type: [ressourceSchema],
      required: true,
    },
    appointment: {
      type: [appointmentSchema],
      required: true,
    },
    projectGoal: {
      type: [projectGoalSchema],
      required: true,
    },
    paymentDeadline: {
      type: String,
      required: true,
    },
    paymentType: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
