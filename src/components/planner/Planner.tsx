import { useState } from "react";
import ProjectCard from "./components/ProjectCard/ProjectCard";
import "../../assets/style/Planner.css";
import Row from "./components/Row";
import { RessourceData } from "../../data/constants/RessourceData";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { IProject } from "../../data/interfaces/IProject";
import { ProjectExample } from "../../data/ProjectExample";
import { useMantineTheme } from "@mantine/core";

const Planner = () => {
  const theme = useMantineTheme();

  const [projects, setProjects] = useState<IProject[]>(
    ProjectExample.filter((p) => {
      return p.CLIENT !== "I.G.C.";
    })
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid">
        <div
          className="mustBeAssign"
          style={{
            backgroundColor: theme.colors.yellow[0],
          }}
        >
          {projects
            .filter((project) => project.ETAT === "mustBeAssign")
            .map((filteredProjects, index) => (
              <ProjectCard key={index} project={filteredProjects} />
            ))}
        </div>
        <div
          className="title"
          style={{
            backgroundColor: theme.colors.yellow[5],
          }}
        >
          <p>Nouvelle Entrée</p>
          <p>Ressource</p>
          <p>Facturation</p>
          <p>Correction</p>
          <p>Reprise</p>
          <p>S01 - 00/00/00 au 00/00/00</p>
          <p>S02 - 00/00/00 au 00/00/00</p>
          <p>S03 - 00/00/00 au 00/00/00</p>
          <p>S04 - 00/00/00 au 00/00/00</p>
          <p>S05 - 00/00/00 au 00/00/00</p>
          <p>S06 - 00/00/00 au 00/00/00</p>
        </div>
        <div
          className="newEntry"
          style={{
            backgroundColor: theme.colors.yellow[0],
          }}
        >
          {projects
            .filter((project) => project.ETAT?.includes("newEntry"))
            .map((project) => (
              <ProjectCard key={project.DOSSIER} project={project} />
            ))}
        </div>
        {RessourceData.map((ressource, index) => (
          <Row
            key={index}
            id={`${ressource.firstName[0]}.${ressource.lastName}`}
            ressource={`${ressource.firstName} ${ressource.lastName}`}
            projects={projects}
            setProjects={setProjects}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default Planner;
