import { IProject } from "../data/interfaces/IProject";

export const projectNameReducer = (projects: IProject) => {
  const { DOSSIER, AFFAIRE } = projects;

  if (AFFAIRE.includes("SCI")) {
    const newAFFAIRE = AFFAIRE.split("SCI")[1].split("(")[0].split(" - ")[0];
    return `${DOSSIER} - ${newAFFAIRE}`;
  } else if (AFFAIRE.includes("M. et Mme")) {
    const newAFFAIRE = AFFAIRE.split("M. et Mme")[1]
      .split("(")[0]
      .split(" - ")[0];
    return `${DOSSIER} - ${newAFFAIRE}`;
  } else if (AFFAIRE.includes("M. ET MME")) {
    const newAFFAIRE = AFFAIRE.split("M. ET MME")[1]
      .split("(")[0]
      .split(" - ")[0];
    return `${DOSSIER} - ${newAFFAIRE}`;
  } else if (AFFAIRE.includes("M.")) {
    const newAFFAIRE = AFFAIRE.split("M.")[1]
      .split("(")[0]
      .split(" - ")[0]
      .split(" et ")[0];
    return `${DOSSIER} - ${newAFFAIRE}`;
  } else if (AFFAIRE.includes("Mme")) {
    const newAFFAIRE = AFFAIRE.split("Mme")[1].split("(")[0].split(" - ")[0];
    return `${DOSSIER} - ${newAFFAIRE}`;
  } else if (
    AFFAIRE.includes("CONSTRUCTION") ||
    AFFAIRE.includes("Construction")
  ) {
    const newAFFAIRE = "CONSTRUCTION";
    return `${DOSSIER} - ${newAFFAIRE}`;
  } else if (AFFAIRE.includes("EXTENSION") || AFFAIRE.includes("Extension")) {
    if (AFFAIRE.includes("EXTENSION")) {
      const newAFFAIRE = AFFAIRE.split("EXTENSION")[1]
        .split("(")[0]
        .split(" - ")[0];
      return `${DOSSIER} - ${newAFFAIRE}`;
    }
    if (AFFAIRE.includes("Extension")) {
      const newAFFAIRE = AFFAIRE.split("Extension")[1]
        .split("(")[0]
        .split(" - ")[0];
      return `${DOSSIER} - ${newAFFAIRE}`;
    }
  } else if (AFFAIRE.includes("PROPRIETE") || AFFAIRE.includes("Propriété")) {
    if (AFFAIRE.includes("PROPRIETE")) {
      const newAFFAIRE = AFFAIRE.split("PROPRIETE")[1]
        .split("(")[0]
        .split(" - ")[0];
      return `${DOSSIER} - ${newAFFAIRE}`;
    }
    if (AFFAIRE.includes("Propriété")) {
      const newAFFAIRE = AFFAIRE.split("Propriété")[1]
        .split("(")[0]
        .split(" - ")[0];
      return `${DOSSIER} - ${newAFFAIRE}`;
    }
  } else if (AFFAIRE.includes("PT") || AFFAIRE.includes("pt")) {
    const newAFFAIRE = "POUTRE";
    return `${DOSSIER} - ${newAFFAIRE}`;
  } else if (AFFAIRE.includes("CONSTRUCTION DE")) {
    const newAFFAIRE = AFFAIRE.split("CONSTRUCTION DE ")[1];
    return `${DOSSIER} - ${newAFFAIRE}`;
  }

  return `${DOSSIER} - ${AFFAIRE.split("(")[0].split(" - ")[0]}`;
};
