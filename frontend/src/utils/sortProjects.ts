import { IProject } from "../data/interfaces/IProject";
import dayjs from "dayjs";
import CustomParseFormat from "dayjs/plugin/CustomParseFormat";

dayjs.extend(CustomParseFormat);

export const sortProjects = (projects: IProject[]) => {
  projects.sort((a, b): number => {
    // Trie par année de rendu
    if (
      dayjs(a.RENDU, "DD-MM-YYYY").year() > dayjs(b.RENDU, "DD-MM-YYYY").year()
    )
      return 1;
    if (
      dayjs(a.RENDU, "DD-MM-YYYY").year() < dayjs(b.RENDU, "DD-MM-YYYY").year()
    )
      // Trie par mois de rendu
      return -1;
    if (
      dayjs(a.RENDU, "DD-MM-YYYY").month() >
      dayjs(b.RENDU, "DD-MM-YYYY").month()
    )
      return 1;
    if (
      dayjs(a.RENDU, "DD-MM-YYYY").month() <
      dayjs(b.RENDU, "DD-MM-YYYY").month()
    )
      return -1;

    // Trie par jour de rendu
    if (
      dayjs(a.RENDU, "DD-MM-YYYY").date() > dayjs(b.RENDU, "DD-MM-YYYY").date()
    )
      return 1;
    if (
      dayjs(a.RENDU, "DD-MM-YYYY").date() < dayjs(b.RENDU, "DD-MM-YYYY").date()
    )
      return -1;

    // Trie par année de dossier
    if (a.DOSSIER.split(".")[0] > b.DOSSIER.split(".")[0]) return 1;
    if (a.DOSSIER.split(".")[0] < b.DOSSIER.split(".")[0]) return -1;

    // Trie par mois de dossier
    if (a.DOSSIER.split(".")[1] > b.DOSSIER.split(".")[1]) return 1;
    if (a.DOSSIER.split(".")[1] < b.DOSSIER.split(".")[1]) return -1;

    // Trie par numéro de dossier
    if (
      a.DOSSIER.split(".")[2].substring(0, 3) >
      b.DOSSIER.split(".")[2].substring(0, 3)
    )
      return 1;
    if (
      a.DOSSIER.split(".")[2].substring(0, 3) <
      b.DOSSIER.split(".")[2].substring(0, 3)
    )
      return -1;

    return 1;
  });

  return projects;
};
