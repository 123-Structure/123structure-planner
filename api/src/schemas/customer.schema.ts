import { Schema } from "mongoose";
import { ICustomer } from "../data/interfaces/ICustomer";
import { appointmentSchema } from "./utils/appointment.schema";
import { contactSchema } from "./utils/contact.schema";
import { projectGoalSchema } from "./utils/projectGoal.schema";
import { ressourceSchema } from "./utils/ressource.schema";

export const customerSchema = new Schema<ICustomer>(
  {
    category: {
      type: String,
      required: true,
    },
    group: {
      type: String,
      required: false,
      default: "",
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
    phone: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: false,
      default: "",
    },
    contact: {
      type: [contactSchema],
      required: true,
    },
    priceList: {
      type: String,
      required: false,
      default: "",
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
      required: false,
      default: "",
    },
    paymentType: {
      type: String,
      required: false,
      default: "",
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

customerSchema.index(
  {
    category: "text",
    group: "text",
    name: "text",
    "location.cp": "text",
    "location.city": "text",
    email: "text",
    phone: "text",

    "contact.firstName": "text",
    "contact.lastName": "text",
    "contact.email": "text",
    "contact.phone1": "text",
    "contact.phone2": "text",
    "contact.category": "text",

    "commercial.firstName": "text",
    "commercial.lastName": "text",
    "commercial.role": "text",
    "commercial.company": "text",

    "appointment.location.cp": "text",
    "appointment.location.city": "text",
    "appointment.title": "text",
    "appointment.content": "text",
  },
  { default_language: "french" }
);
