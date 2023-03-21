import { useMantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../../../data/constants/ItemTypes";
import { useProject } from "../../../../hooks/Project/useProject";
import { useUpdateProject } from "../../../../hooks/Project/useUpdateProject";
import { sortProjects } from "../../../../utils/sortProjects";
import CustomTooltip from "../../../utils/CustomTooltip";
import ProjectCard from "../ProjectCard/ProjectCard";

const MustBeAssign = () => {
  const theme = useMantineTheme();
  const projects = useProject();
  const setProjects = useUpdateProject();

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item: any, monitor) => updateProject(item.id, "mustBeAssign"),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const updateProject = (itemId: any, newValue: string) => {
    const newProjects = [...projects];
    const changedProject = newProjects.filter(
      (project) =>
        project.DOSSIER === itemId && project.ETAT.includes("mustBeAssign")
    );

    if (
      changedProject[0].H_DESSIN === 0 ||
      changedProject[0].H_INGENIEUR === 0 ||
      changedProject[0].RENDU === undefined ||
      changedProject[0].INGENIEUR.length === 0
    ) {
      showNotification({
        title: "⛔ Action impossible - Informations manquantes",
        message:
          'Ce projet ne peut pas être déplacé dans "Projets à attribuer"',
        color: "red",
      });
    } else {
      if (changedProject.length === 0) {
        showNotification({
          title: "⛔ Action impossible",
          message:
            'Ce projet ne peut pas être déplacé dans "Projets à attribuer"',
          color: "red",
        });
      } else {
        changedProject[0].ETAT = newValue;

        setProjects(newProjects);
      }
    }
  };

  return (
    <CustomTooltip label={"Projet(s) à attribuer"}>
      <div
        className="mustBeAssign"
        ref={drop}
        style={{
          backgroundColor: isOver
            ? theme.colors.yellow[3]
            : theme.colors.yellow[0],
        }}
      >
        {sortProjects(
          projects.filter((project) => project.ETAT === "mustBeAssign")
        ).map((filteredProjects, index) => (
          <ProjectCard key={index} project={filteredProjects} />
        ))}
      </div>
    </CustomTooltip>
  );
};

export default MustBeAssign;
