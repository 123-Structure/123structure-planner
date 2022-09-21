import { useState } from "react";
import ProjectCard from "./projectCard/ProjectCard";
import "./Planner.css";
import Row from "./projectCard/Row";
import { RessourceList } from "../../utils/RessourceData";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { IProject } from "../../utils/interface/IProject";
import { ProjectExample } from "../../utils/ProjectExample";

const Planner = () => {
  const [project, setProject] = useState<IProject[]>(
    ProjectExample.filter((p) => {
      return p.CLIENT !== "I.G.C.";
    })
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid">
        <div className="mustBeAssign">
          {project.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
        <div className="title">
          <p>Ressource</p>
          <p>Nouvelle Entrée</p>
          <p>Facturation</p>
          <p>Correction</p>
          <p>Reprise</p>
          <p>S00 - 00/00/00 au 00/00/00</p>
          <p>S00 - 00/00/00 au 00/00/00</p>
          <p>S00 - 00/00/00 au 00/00/00</p>
          <p>S00 - 00/00/00 au 00/00/00</p>
          <p>S00 - 00/00/00 au 00/00/00</p>
          <p>S00 - 00/00/00 au 00/00/00</p>
        </div>
        {RessourceList.map((ressource, index) => (
          <Row
            key={index}
            ressource={`${ressource.firstName} ${ressource.lastName}`}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default Planner;
