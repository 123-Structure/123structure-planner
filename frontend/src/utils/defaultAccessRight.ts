import { TRole } from "../data/types/TRole";

export const defaultAccessRight = (role: TRole[]) => {
  return {
    mustBeAssign: role?.includes("Administrateur"),
    newEntry: role?.includes("Administrateur"),
    invoicing: role?.includes("Administrateur") || role?.includes("Ingénieur"),
    correction:
      role?.includes("Administrateur") ||
      role?.includes("Dessinateur") ||
      role?.includes("Ingénieur"),
    mustBeFix:
      role?.includes("Administrateur") ||
      role?.includes("Dessinateur") ||
      role?.includes("Ingénieur"),
    week:
      role?.includes("Administrateur") ||
      role?.includes("Dessinateur") ||
      role?.includes("Ingénieur"),
  };
};
