import { TPhase } from "../types/TPhase";

export interface IProject {
  DOSSIER: string;
  AFFAIRE: string;
  CLIENT: string;
  RESSOURCES: string;
  SOL: string;
  LIVRAISON: string;
  "LIVR. (tri)": string;
  LIVRTRI: string;
  "TEMPS PREVU": string;
  "TEMPS REALISE": string;
  "TEMPS RESTANT": string;
  "MONTANT DEVIS (EUR HT)": string;
  ETAT: string;
  RENDU: string | undefined;
  PHASE: TPhase;
  H_DESSIN: number;
  H_INGENIEUR: number;
  [key: string]: string | boolean | number | undefined;
}
