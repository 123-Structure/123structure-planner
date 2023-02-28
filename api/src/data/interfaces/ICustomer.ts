import { Types } from "mongoose";
import { IAppointment } from "./IAppointment";
import { IContact } from "./IContact";
import { IProjectGoal } from "./IProjectGoal";
import { IRessource } from "./IRessource";

export interface ICustomer {
  _id: Types.ObjectId;
  category: string;
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
  commercial: IRessource[];
  appointment: IAppointment[];
  projectGoal: IProjectGoal[];
  paymentDeadline: string;
  paymentType: string;
  paymentStatus: string;
}
