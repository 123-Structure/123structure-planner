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
          height: "60px",
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
          00.00.000A - DUPONT
        </p>
        <p style={{ fontWeight: "bold", margin: "0" }}>jj/mm/aaaa</p>
      </div>
    </>
  );
};

export default ProjectCard;
