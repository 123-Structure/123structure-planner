export interface IRessource {
  firstName: string;
  lastName: string;
  role: "Dessinateur" | "Ingénieur" | "Administrateur" | undefined;
  company:
    | "Clisson"
    | "Anglet"
    | "Villefranche-sur-Saône"
    | "Global"
    | undefined;
}
