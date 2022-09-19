import { useState } from "react";
import MoreInfoModal from "./MoreInfoModal";

const ProjectCard = () => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const handleShowMoreInfoModal = () => {
    setShowMoreInfo(true);
  };

  return (
    <>
      <MoreInfoModal
        showMoreInfo={showMoreInfo}
        setShowMoreInfo={setShowMoreInfo}
      />
      <div
        style={{
          backgroundColor: "white",
          padding: "4px 4px 8px 4px",
          borderRadius: "4px",
          marginBottom: "2px",
        }}
        onClick={handleShowMoreInfoModal}
      >
        <p
          style={{
            margin: 0,
          }}
        >
          22.07.449L - GUYON
        </p>
        <b>jj/mm/aaaa</b>
      </div>
    </>
  );
};

export default ProjectCard;
