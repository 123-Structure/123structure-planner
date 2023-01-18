import { TCustomerCategory } from "../types/TCustomerCategory";
import { TPaymentType } from "../types/TPaymentType";
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
  lastAppointment: Date;
  projectGoal: number;
  paymentDeadline: 30 | 45;
  paymentType: TPaymentType;
  GMapsLink: string;
}
