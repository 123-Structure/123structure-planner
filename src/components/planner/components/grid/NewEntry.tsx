import { useMantineTheme } from "@mantine/core";
import React from "react";
import { useProject } from "../../../../context/ProjectContext";
import { sortProjects } from "../../../../utils/sortProjects";
import ProjectCard from "../ProjectCard/ProjectCard";

const NewEntry = () => {
  const theme = useMantineTheme();
  const projects = useProject();

  return (
    <div
      className="newEntry"
      style={{
        backgroundColor: theme.colors.yellow[0],
      }}
    >
      {sortProjects(
        projects.filter((project) => project.ETAT.includes("newEntry"))
      ).map((project) => (
        <ProjectCard key={project.DOSSIER} project={project} />
      ))}
    </div>
  );
};

export default NewEntry;
