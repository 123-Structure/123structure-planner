import { useState } from "react";
import { projectNameReducer } from "../../../../utils/projectNameReducer";
import { IProject } from "../../../../data/interfaces/IProject";
import ProjectCardSettingsModal from "../ProjectCardSettingsModal/ProjectCardSettingsModal";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../../../data/constants/ItemTypes";
import { Tooltip } from "@mantine/core";
import truncateString from "../../../../utils/truncateString";
import RenderingDateBadge from "../../../utils/RenderingDateBadge";
import InvoicingStateSwitch from "../../../utils/InvoicingStateSwitch";
import { getMonthColor } from "../../../../utils/getMonthColor";

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
      <Tooltip
        label={`${props.project.DOSSIER} - ${props.project.AFFAIRE}`}
        color="yellow"
        transition="slide-up"
        transitionDuration={300}
        openDelay={1000}
        style={{ color: "black", fontWeight: "bold" }}
        withArrow
        arrowSize={8}
      >
        <div
          ref={drag}
          style={{
            height: "66px",
            backgroundColor: getMonthColor(
              props.project.DOSSIER.split(".")[1]
            )[0],
            padding: "2px 4px 6px 6px",
            opacity: isDragging ? "0.5" : 1,
            outline: "1px solid black",
            color: getMonthColor(props.project.DOSSIER.split(".")[1])[1],
            fontWeight: "bold",
          }}
          onDoubleClick={handleShowMoreInfoModal}
        >
          <p
            style={{
              margin: "0 0 4px 0",
            }}
          >
            {truncateString(projectNameReducer(props.project))}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "16px",
            }}
          >
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
      </Tooltip>
    </>
  );
};

export default ProjectCard;
