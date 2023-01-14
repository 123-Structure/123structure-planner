import { useState } from "react";
import { projectNameReducer } from "../../../../utils/projectNameReducer";
import { IProject } from "../../../../data/interfaces/IProject";
import ProjectCardSettingsModal from "../ProjectCardSettingsModal/ProjectCardSettingsModal";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../../../data/constants/ItemTypes";
import truncateString from "../../../../utils/truncateString";
import RenderingDateBadge from "../../../utils/RenderingDateBadge";
import InvoicingStateSwitch from "../../../utils/InvoicingStateSwitch";
import { getMonthColor } from "../../../../utils/getMonthColor";
import CustomTooltip from "../../../utils/CustomTooltip";
import "../../../../assets/style/ProjectCard.css";

interface IProjectCardProps {
  project: IProject;
}

const ProjectCard = (props: IProjectCardProps) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [isInvoiced, setIsInvoiced] = useState(
    props.project.ETAT.includes("isInvoiced") ||
      props.project.ETAT.includes("partialInvoiced")
  );
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: {
      id: props.project.DOSSIER,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleShowMoreInfoModal = () => {
    setShowMoreInfo(true);
  };

  return (
    <>
      <ProjectCardSettingsModal
        showMoreInfo={showMoreInfo}
        setShowMoreInfo={setShowMoreInfo}
        project={props.project}
        isInvoiced={isInvoiced}
        setIsInvoiced={setIsInvoiced}
      />
      <CustomTooltip
        label={`${props.project.DOSSIER} - ${props.project.AFFAIRE}`}
      >
        <div
          ref={drag}
          className="projectCard"
          style={{
            backgroundColor: getMonthColor(
              props.project.DOSSIER.split(".")[1]
            )[0],
            opacity: isDragging ? "0.5" : 1,
            color: getMonthColor(props.project.DOSSIER.split(".")[1])[1],
          }}
          onDoubleClick={handleShowMoreInfoModal}
        >
          <p className="projectCardName">
            {truncateString(projectNameReducer(props.project))}
          </p>
          <div className="projectCardData">
            <RenderingDateBadge project={props.project} />
            <InvoicingStateSwitch
              project={props.project}
              isInvoiced={isInvoiced}
              setIsInvoiced={setIsInvoiced}
              isInvoicedLabel={"F"}
              isNotInvoicedLabel={"NF"}
              isPartialInvoicedLabel={"PF"}
            />
          </div>
        </div>
      </CustomTooltip>
    </>
  );
};

export default ProjectCard;
