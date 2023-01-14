import { useDrop } from "react-dnd";
import { ItemTypes } from "../../../../data/constants/ItemTypes";
import ProjectCard from "../ProjectCard/ProjectCard";
import { useMantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import {
  useProject,
  useUpdateProject,
} from "../../../../context/ProjectContext";
import { sortProjects } from "../../../../utils/sortProjects";
import dayjs from "dayjs";
import IsoWeek from "dayjs/plugin/isoWeek.js";
import CustomTooltip from "../../../utils/CustomTooltip";

interface IWeekProps {
  id: string;
  rowId: string;
}

const Week = (props: IWeekProps) => {
  const theme = useMantineTheme();
  const projects = useProject();
  const setProjects = useUpdateProject();

  const weekNumber = (weekIndex: number) => {
    return dayjs().isoWeek() + weekIndex > 52
      ? dayjs().isoWeek() + weekIndex - 52
      : dayjs().isoWeek() + weekIndex;
  };

  const updateProject = (itemId: any, newValue: string) => {
    const newProjects = [...projects];

    const changedProject = newProjects.filter(
      (project) =>
        project.DOSSIER === itemId &&
        (project.ETAT.includes("w") || project.ETAT.includes("mustBeAssign")) &&
        !project.ETAT.includes("new")
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
    <CustomTooltip
      label={`n°${weekNumber(
        parseInt(props.id[1]) - 1
      )} - ${props.rowId.toUpperCase()}`}
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
        {sortProjects(
          projects.filter((project) => project.ETAT.includes(props.id))
        )
          .filter((project) => project.ETAT.includes(props.rowId))
          .map((filteredProjects, index) => (
            <ProjectCard key={index} project={filteredProjects} />
          ))}
      </div>
    </CustomTooltip>
  );
};

export default Week;
