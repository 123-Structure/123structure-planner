export interface IAppointment {
  date: Date;
  contact: string[];
  location: {
    address: string;
    cp: string;
    city: string;
  };
  title: string;
  content: string;
}
