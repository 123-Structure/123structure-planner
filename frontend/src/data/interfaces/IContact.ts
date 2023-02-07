import { TContactCategories } from "../types/TContactCategories";

export interface IContact {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  category: TContactCategories;
  gender: "M." | "Mme";
}
