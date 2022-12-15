import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import {
  useProject,
  useUpdateProject,
} from "../../../../../../../context/ProjectContext";
import { IProject } from "../../../../../../../data/interfaces/IProject";
import CustomButton from "../../../../../../utils/CustomButton";

interface IValidateButton {
  importProject: IProject[] | undefined;
  handleModalClose: () => void;
  newProjectLength: number | undefined;
  duplicatedProjectLength: number | undefined;
}

const ValidateButton = (props: IValidateButton) => {
  const projects = useProject();
  const setProjects = useUpdateProject();

  const addNewProject = () => {
    const newProjects = [...projects];
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
          "TEMPS PREVU": p["TEMPS PREVU"] === undefined ? "" : p["TEMPS PREVU"],
          "TEMPS REALISE":
            p["TEMPS REALISE"] === undefined ? "" : p["TEMPS REALISE"],
          "TEMPS RESTANT":
            p["TEMPS RESTANT"] === undefined ? "" : p["TEMPS RESTANT"],

          "MONTANT DEVIS (EUR HT)":
            p["MONTANT DEVIS (EUR HT)"] === undefined
              ? ""
              : p["MONTANT DEVIS (EUR HT)"],
          ETAT: p.ETAT === undefined ? "newEntry" : p.ETAT,
          RENDU: undefined,
          PHASE: p.PHASE === undefined ? "EXE" : p.PHASE,
          H_DESSIN: 0,
          H_INGENIEUR: 0,
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

  return (
    <div
      style={{
        marginBottom: "16px",
        display: "flex",
        flexDirection: "row",
        gap: "16px",
      }}
    >
      <CustomButton
        color="green"
        disabled={props.duplicatedProjectLength !== 0}
        handleClick={addNewProject}
        icon={<IconCheck />}
        label={`Charger ${props.newProjectLength} nouveau(x) projet(s)`}
      />
      <CustomButton
        color="red"
        handleClick={cancelUpdate}
        icon={<IconX />}
        label={"Annuler le chargement de nouveaux projets"}
      />
    </div>
  );
};

export default ValidateButton;
