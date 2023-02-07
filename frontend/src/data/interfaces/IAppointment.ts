import { TAppointmentTitle } from "../types/TApppointmentTitle";
import { IContact } from "./IContact";

export interface IAppointment {
  date: Date;
  contact: string[];
  location: {
    address: string;
    cp: string;
    city: string;
  };
  title: TAppointmentTitle;
  content: string;
}
