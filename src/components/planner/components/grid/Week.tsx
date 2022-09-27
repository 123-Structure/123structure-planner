import { useDrop } from "react-dnd";
import { ItemTypes } from "../../../../data/constants/ItemTypes";
import ProjectCard from "../ProjectCard/ProjectCard";
import { Tooltip, useMantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import {
  useProject,
  useUpdateProject,
} from "../../../../context/ProjectContext";

interface IWeekProps {
  id: string;
  rowId: string;
}

const Week = (props: IWeekProps) => {
  const theme = useMantineTheme();
  const projects = useProject();
  const setProjects = useUpdateProject();

  const updateProject = (itemId: any, newValue: string) => {
    const newProjects = [...projects];

    const changedProject = newProjects.filter(
      (project) =>
        project.DOSSIER === itemId &&
        (project.ETAT.includes("w") || project.ETAT.includes("mustBeAssign"))
    );

    if (changedProject.length === 0) {
      showNotification({
        title: "⛔ Action impossible",
        message: "Ce projet ne peut pas être déplacé dans une semaine",
        color: "red",
      });
    } else {
      changedProject[0].ETAT = newValue;
      setProjects(newProjects);
    }
  };

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item: any, monitor) =>
      updateProject(item.id, `${props.id} ${props.rowId}`),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <Tooltip
      label={`${props.id.replace("w", "n°")} - ${props.rowId}`}
      position="bottom-end"
      color="gray"
      transition="slide-up"
      transitionDuration={300}
      openDelay={1000}
      style={{ fontWeight: "bold" }}
      withArrow
      arrowSize={8}
    >
      <div
        className="week"
        id={props.id}
        ref={drop}
        style={{
          backgroundColor: isOver
            ? theme.colors.yellow[3]
            : parseInt(props.id[1]) % 2 === 0
            ? theme.colors.gray[4]
            : "white",
        }}
      >
        {projects
          .filter((project) => project.ETAT.includes(props.id))
          .filter((project) => project.ETAT.includes(props.rowId))
          .map((filteredProjects, index) => (
            <ProjectCard key={index} project={filteredProjects} />
          ))}
      </div>
    </Tooltip>
  );
};

export default Week;
