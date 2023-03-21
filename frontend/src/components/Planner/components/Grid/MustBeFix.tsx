import { useMantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../../../data/constants/ItemTypes";
import { useProject } from "../../../../hooks/Project/useProject";
import { useUpdateProject } from "../../../../hooks/Project/useUpdateProject";
import { sortProjects } from "../../../../utils/sortProjects";
import ProjectCard from "../ProjectCard/ProjectCard";

interface IMustBeFixProps {
  rowId: string;
}

const MustBeFix = (props: IMustBeFixProps) => {
  const theme = useMantineTheme();
  const projects = useProject();
  const setProjects = useUpdateProject();

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item: any, monitor) =>
      updateProject(item.id, `mustBeFix ${props.rowId}`),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const updateProject = (itemId: any, newValue: string) => {
    const newProjects = [...projects];

    const changedProject = newProjects.filter(
      (project) =>
        project.DOSSIER === itemId &&
        (project.ETAT.includes("correction") ||
          project.ETAT.includes("invoicing") ||
          project.ETAT.includes("mustBeFix"))
    );

    if (changedProject.length === 0) {
      showNotification({
        title: "⛔ Action impossible",
        message: 'Ce projet ne peut pas être déplacé dans "Reprise"',
        color: "red",
      });
    } else {
      changedProject[0].ETAT = newValue;
      setProjects(newProjects);
    }
  };

  return (
    <div
      className="mustBeFix"
      ref={drop}
      style={{
        backgroundColor: isOver
          ? theme.colors.yellow[3]
          : theme.colors.orange[1],
      }}
    >
      {sortProjects(
        projects.filter((project) => project.ETAT.includes("mustBeFix"))
      )
        .filter((project) => project.ETAT.includes(props.rowId))
        .map((filteredProjects, index) => (
          <ProjectCard key={index} project={filteredProjects} />
        ))}
    </div>
  );
};

export default MustBeFix;
