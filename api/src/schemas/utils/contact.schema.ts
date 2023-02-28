import { Schema } from "mongoose";
import { IContact } from "../../data/interfaces/IContact";

export const contactSchema = new Schema<IContact>({
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
  email: {
    type: String,
    required: true,
  },
  phone1: {
    type: String,
    required: true,
  },
  phone2: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});
