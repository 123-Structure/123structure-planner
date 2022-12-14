import { useMantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React from "react";
import { useDrop } from "react-dnd";
import { useProject } from "../../../../context/ProjectContext";
import { useRessources } from "../../../../context/RessourceContext";
import { ItemTypes } from "../../../../data/constants/ItemTypes";
import { sortProjects } from "../../../../utils/sortProjects";
import ProjectCard from "../_ProjectCard/ProjectCard";

const NewEntry = () => {
  const theme = useMantineTheme();
  const projects = useProject();
  const ressources = useRessources();

  const updateProject = (itemId: any, newValue: string) => {
    const newProjects = [...projects];

    const changedProject = newProjects.filter(
      (project) =>
        project.DOSSIER === itemId && project.ETAT.includes("newEntry")
    );

    if (changedProject.length === 0) {
      showNotification({
        title: "⛔ Action impossible",
        message: 'Ce projet ne peut pas être déplacé dans "Nouvelle Entrée"',
        color: "red",
      });
    }
  };

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item: any, monitor) => updateProject(item.id, ""),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      className="newEntry"
      ref={drop}
      style={{
        backgroundColor: isOver
          ? theme.colors.yellow[3]
          : theme.colors.yellow[0],
        gridRow: `3 / span ${ressources.length}`,
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
