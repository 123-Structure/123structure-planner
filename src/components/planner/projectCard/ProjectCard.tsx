import { useState } from "react";
import { projectNameReducer } from "../../../utils/function/projectNameReducer";
import { IProject } from "../../../utils/interface/IProject";
import MoreInfoModal from "./MoreInfoModal";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../../utils/constant/ItemTypes";

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
      <div
        ref={drag}
        style={{
          height: "60px",
          backgroundColor: "white",
          padding: "4px 4px 8px 4px",
          borderRadius: "4px",
          marginBottom: "2px",
          userSelect: "none",
          opacity: isDragging ? "0.5" : 1,
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
    </>
  );
};

export default ProjectCard;
