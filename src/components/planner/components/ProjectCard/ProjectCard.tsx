import { useState } from "react";
import { projectNameReducer } from "../../../../utils/projectNameReducer";
import { IProject } from "../../../../data/interfaces/IProject";
import MoreInfoModal from "./MoreInfoModal";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../../../data/constants/ItemTypes";
import { Tooltip } from "@mantine/core";

interface IProjectCardProps {
  project: IProject;
}

const ProjectCard = (props: IProjectCardProps) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

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
      <MoreInfoModal
        showMoreInfo={showMoreInfo}
        setShowMoreInfo={setShowMoreInfo}
        project={props.project}
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
            height: "60px",
            backgroundColor: "white",
            padding: "4px 4px 8px 4px",
            borderRadius: "4px",
            userSelect: "none",
            opacity: isDragging ? "0.5" : 1,
            outline: "1px solid black",
          }}
          onDoubleClick={handleShowMoreInfoModal}
        >
          <p
            style={{
              margin: 0,
            }}
          >
            {projectNameReducer(props.project)}
          </p>
          <p style={{ fontWeight: "bold", margin: "0" }}>jj/mm/aaaa</p>
        </div>
      </Tooltip>
    </>
  );
};

export default ProjectCard;
