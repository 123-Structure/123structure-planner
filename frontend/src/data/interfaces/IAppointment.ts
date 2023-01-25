import { IContact } from "./IContact";

export interface IAppointment {
  date: Date;
  contact: IContact[];
  location: string;
  title: string;
  text: string;
}