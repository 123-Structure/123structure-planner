export interface IJwtPayload {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string[];
  company:
    | "Clisson"
    | "Anglet"
    | "Villefranche-sur-Saône"
    | "Global"
    | undefined;
  exp: number;
  iat: number;
}
