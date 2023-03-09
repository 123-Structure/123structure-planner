import { TCustomerCategory } from "../types/TCustomerCategory";
import { TPaymentType } from "../types/TPaymentType";
import { TProjectGoal } from "../types/TProjectGoal";
import { IAppointment } from "./IAppointment";
import { IContact } from "./IContact";
import { IRessource } from "./IRessource";

export interface ICustomer {
  _id?: string;
  category: TCustomerCategory;
  group: string;
  name: string;
  location: {
    address: string;
    cp: string;
    city: string;
  };
  email: string;
  phone: string;
  logo: string;
  contact: IContact[];
  priceList: string;
  commercial: string[];
  appointment: IAppointment[];
  projectGoal: TProjectGoal[];
  paymentDeadline: "30 (Fin de mois)" | "30 (Net)" | "45" | "-";
  paymentType: TPaymentType;
  paymentStatus: "A" | "B" | "C";
}
