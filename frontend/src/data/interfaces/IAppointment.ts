import { TAppointmentTitle } from "../types/TApppointmentTitle";
import { IContact } from "./IContact";

export interface IAppointment {
  date: Date;
  contact: IContact[];
  location: string;
  title: TAppointmentTitle;
  content: string;
}
