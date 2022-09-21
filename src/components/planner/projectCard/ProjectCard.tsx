import { useState } from "react";
import { IProject } from "../../../utils/interface/IProject";
import MoreInfoModal from "./MoreInfoModal";

interface IProjectCardProps {
  project: IProject;
}

const ProjectCard = (props: IProjectCardProps) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const handleShowMoreInfoModal = () => {
    setShowMoreInfo(true);
  };

  const projectName = () => {
    const { DOSSIER, AFFAIRE } = props.project;

    if (AFFAIRE.includes("SCI")) {
      const newAFFAIRE = AFFAIRE.split("SCI")[1].split("(")[0].split(" - ")[0];
      return `${DOSSIER} - ${newAFFAIRE}`;
    } else if (AFFAIRE.includes("M. et Mme")) {
      const newAFFAIRE = AFFAIRE.split("M. et Mme")[1]
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
      const newAFFAIRE = AFFAIRE.split("Extension")[1]
        .split("(")[0]
        .split(" - ")[0];
      return `${DOSSIER} - ${newAFFAIRE}`;
    } else if (AFFAIRE.includes("PROPRIETE") || AFFAIRE.includes("Propriété")) {
      const newAFFAIRE = AFFAIRE.split("Propriété")[1]
        .split("(")[0]
        .split(" - ")[0];
      return `${DOSSIER} - ${newAFFAIRE}`;
    } else if (AFFAIRE.includes("PT") || AFFAIRE.includes("pt")) {
      const newAFFAIRE = "POUTRE";
      return `${DOSSIER} - ${newAFFAIRE}`;
    }

    return `${DOSSIER} - ${AFFAIRE.split("(")[0].split(" - ")[0]}`;
  };

  return (
    <>
      <MoreInfoModal
        showMoreInfo={showMoreInfo}
        setShowMoreInfo={setShowMoreInfo}
        project={props.project}
      />
      <div
        style={{
          height: "60px",
          backgroundColor: "white",
          padding: "4px 4px 8px 4px",
          borderRadius: "4px",
          marginBottom: "2px",
          userSelect: "none",
        }}
        onDoubleClick={handleShowMoreInfoModal}
      >
        <p
          style={{
            margin: 0,
          }}
        >
          {projectName()}
        </p>
        <p style={{ fontWeight: "bold", margin: "0" }}>jj/mm/aaaa</p>
      </div>
    </>
  );
};

export default ProjectCard;
