export interface IContact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  category:
    | "Direction"
    | "Commerce"
    | "Conduite de travaux"
    | "Assistance technique"
    | "Secrétariat"
    | "Autre";
  gender: "M." | "Mme";
}
