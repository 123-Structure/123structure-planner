import { TRole } from "../types/TRole";

export interface IRessource {
  firstName: string;
  lastName: string;
  role: TRole[];
  company:
    | "Clisson"
    | "Anglet"
    | "Villefranche-sur-Saône"
    | "Global"
    | undefined;
  fixer: IRessource[] | undefined;
}
