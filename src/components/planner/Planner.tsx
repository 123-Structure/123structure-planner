import ProjectCard from "./components/ProjectCard/ProjectCard";
import "../../assets/style/Planner.css";
import Row from "./components/grid/Row";
import { RessourceData } from "../../data/constants/RessourceData";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useMantineTheme } from "@mantine/core";
import MustBeAssign from "./components/grid/MustBeAssign";
import { useProject, useUpdateProject } from "../../context/ProjectContext";

const Planner = () => {
  const theme = useMantineTheme();
  const projects = useProject();
  const setProjects = useUpdateProject();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid">
        <MustBeAssign />
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
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default Planner;
