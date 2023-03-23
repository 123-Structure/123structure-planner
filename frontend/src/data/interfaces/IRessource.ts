import { TRole } from "../types/TRole";

export interface IRessource {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: TRole[];
  company:
    | "Clisson"
    | "Anglet"
    | "Villefranche-sur-Saône"
    | "Global"
    | undefined;
  fixer?: string[] | undefined;
}
