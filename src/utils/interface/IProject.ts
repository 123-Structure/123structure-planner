export interface IProject {
  DOSSIER: string;
  AFFAIRE: string;
  CLIENT: string;
  ARCHITECTE: string;
  "AGENCE LIVREE": boolean;
  RESSOURCES: string;
  SOL: string;
  LIVRAISON: string;
  "LIVR. (tri)": string;
  LIVRTRI: string;
  "TEMPS PREVU": string;
  "TEMPS REALISE": string;
  "TEMPS RESTANT": string;
  "HONOS (EUR HT)": string;
  [key: string]: string | boolean;
}
