import { useMantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useDrop } from "react-dnd";
import {
  useProject,
  useUpdateProject,
} from "../../../../context/ProjectContext";
import { ItemTypes } from "../../../../data/constants/ItemTypes";
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
      (project) => project.DOSSIER === itemId && project.ETAT === "mustBeAssign"
    );

    if (changedProject.length === 0) {
      showNotification({
        title: "⛔ Action impossible",
        message:
          'Ce projet ne peut pas être déplacé dans les "Projets à attribuer"',
        color: "red",
      });
    } else {
      changedProject[0].ETAT = newValue;
      setProjects(newProjects);
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
