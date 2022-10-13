import { Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import { useEffect, useState } from "react";
import {
  useProject,
  useUpdateProject,
} from "../../../../../context/ProjectContext";
import { IProject } from "../../../../../data/interfaces/IProject";

interface IValidateButton {
  importProject: IProject[] | undefined;
  handleModalClose: () => void;
  newProjectLength: number | undefined;
  setNewProjectLength: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const ValidateButton = (props: IValidateButton) => {
  const projects = useProject();
  const setProjects = useUpdateProject();

  const addNewProject = () => {
    const newProjects = [...projects];
    let newProjectLength = 0;
    const projectID = projects.map((project) => project.DOSSIER);

    props.importProject?.forEach((p) => {
      if (!projectID.includes(p.DOSSIER)) {
        const newProject: IProject = {
          DOSSIER:
            p.DOSSIER === undefined ? "" : p.DOSSIER !== "" ? p.DOSSIER : "",
          AFFAIRE:
            p.AFFAIRE === undefined ? "" : p.AFFAIRE !== "" ? p.AFFAIRE : "",
          CLIENT: p.CLIENT === undefined ? "" : p.CLIENT !== "" ? p.CLIENT : "",
          RESSOURCES:
            p.RESSOURCES === undefined
              ? ""
              : p.RESSOURCES !== ""
              ? p.RESSOURCES
              : "",
          SOL: p.SOL === undefined ? "" : p.SOL !== "" ? p.SOL : "",
          LIVRAISON:
            p.LIVRAISON === undefined
              ? ""
              : p.LIVRAISON !== " "
              ? p.LIVRAISON
              : "",
          "LIVR. (tri)":
            p["LIVR. (tri)"] === undefined
              ? ""
              : p["LIVR. (tri)"] !== ""
              ? p["LIVR. (tri)"]
              : "",
          LIVRTRI:
            p.LIVRTRI === undefined ? "" : p.LIVRTRI !== "" ? p.LIVRTRI : "",
          "TEMPS PREVU":
            p["TEMPS PREVU"] === undefined
              ? ""
              : p["TEMPS PREVU"] !== ""
              ? p["TEMPS PREVU"]
              : "",
          "TEMPS REALISE":
            p["TEMPS REALISE"] === undefined
              ? ""
              : p["TEMPS REALISE"] !== ""
              ? p["TEMPS REALISE"]
              : "",
          "TEMPS RESTANT":
            p["TEMPS RESTANT"] === undefined
              ? ""
              : p["TEMPS RESTANT"] !== ""
              ? p["TEMPS RESTANT"]
              : "",
          "MONTANT DEVIS (EUR HT)":
            p["MONTANT DEVIS (EUR HT)"] === undefined
              ? ""
              : p["MONTANT DEVIS (EUR HT)"] !== ""
              ? p["MONTANT DEVIS (EUR HT)"]
              : "",
          ETAT:
            p.ETAT === undefined
              ? "newEntry"
              : p.ETAT !== ""
              ? p.ETAT
              : "newEntry",
        };

        newProjects.push(newProject);
      }
    });

    setProjects(newProjects);
    props.handleModalClose();
    showNotification({
      title: `✅ ${props.newProjectLength} projet(s) ajouté(s)`,
      message: "Base de donnée mise à jour",
      color: "green",
    });
  };

  const cancelUpdate = () => {
    props.handleModalClose();
    showNotification({
      title: "❌ Chargement de nouveaux projets annulé",
      message: "Aucun nouveau projet ajouté",
      color: "red",
    });
  };

  useEffect(() => {
    const projectID = projects.map((project) => project.DOSSIER);

    props.setNewProjectLength(
      props.importProject?.filter((p) => !projectID.includes(p.DOSSIER)).length
    );
  }, []);

  return (
    <div style={{ marginBottom: "16px" }}>
      <Button
        color="green"
        style={{ marginRight: "16px" }}
        onClick={addNewProject}
      >
        <IconCheck size={24} style={{ marginRight: "8px" }} />
        {`Charger ${props.newProjectLength} nouveau(x) projet(s)`}
      </Button>
      <Button color="red" onClick={cancelUpdate}>
        <IconX size={24} style={{ marginRight: "8px" }} />
        Annuler le chargement de nouveaux projets
      </Button>
    </div>
  );
};

export default ValidateButton;
