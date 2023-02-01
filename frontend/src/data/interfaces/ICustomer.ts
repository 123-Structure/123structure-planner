import { TCustomerCategory } from "../types/TCustomerCategory";
import { TPaymentType } from "../types/TPaymentType";
import { TProjectGoal } from "../types/TProjectGoal";
import { IAppointment } from "./IAppointment";
import { IContact } from "./IContact";
import { IRessource } from "./IRessource";

export interface ICustomer {
  category: TCustomerCategory;
  group: string;
  name: string;
  address: string;
  cp: string;
  city: string;
  email: string;
  phone: string;
  logo: string;
  contact: IContact[];
  priceList: string;
  commercial: IRessource[];
  appointment: IAppointment[];
  projectGoal: TProjectGoal[];
  paymentDeadline: 30 | 45;
  paymentType: TPaymentType;
  paymentStatus: "A" | "B" | "C";
}
