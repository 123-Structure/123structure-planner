import { ScrollArea, useMantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { useProject } from "../../../../context/ProjectContext";
import { useRessources } from "../../../../context/RessourceContext";
import { ItemTypes } from "../../../../data/constants/ItemTypes";
import { sortProjects } from "../../../../utils/sortProjects";
import ProjectCard from "../ProjectCard/ProjectCard";

const NewEntry = () => {
  const theme = useMantineTheme();
  const projects = useProject();
  const ressources = useRessources();

  const [height, setHeight] = useState(0);

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

  useEffect(() => {
    const onPageLoad = () => {
      const elements = document.querySelectorAll("div.correction");
      let totalHeight = 0;

      for (let i = 0; i < elements.length; i++) {
        totalHeight += elements[i].getBoundingClientRect().height;
      }
      console.log(totalHeight);
      setHeight(totalHeight);
    };

    onPageLoad();
  }, [document.querySelectorAll("div.correction")]);

  return (
    <div
      ref={drop}
      className="newEntry"
      style={{
        // height: height(),
        backgroundColor: isOver
          ? theme.colors.yellow[3]
          : theme.colors.yellow[0],
        gridRow: `4 / span ${
          ressources.filter(
            (ressource) => !ressource.role.includes("Administrateur")
          ).length
        }`,
      }}
    >
      <ScrollArea
        style={{
          height: height,
        }}
      >
        {sortProjects(
          projects.filter((project) => project.ETAT.includes("newEntry"))
        ).map((project) => (
          <ProjectCard key={project.DOSSIER} project={project} />
        ))}
      </ScrollArea>
    </div>
  );
};

export default NewEntry;
