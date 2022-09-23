import { useDrop } from "react-dnd";
import { ItemTypes } from "../../../data/constants/ItemTypes";
import { IProject } from "../../../data/interfaces/IProject";
import ProjectCard from "./ProjectCard/ProjectCard";
import { Tooltip, useMantineTheme } from "@mantine/core";

interface IWeekProps {
  id: string;
  rowId: string;
  projects: IProject[];
  setProjects: React.Dispatch<React.SetStateAction<IProject[]>>;
}

const Week = (props: IWeekProps) => {
  const theme = useMantineTheme();

  const updateProject = (itemId: any) => {
    const newProjects = [...props.projects];

    newProjects.filter(
      (project) => project.DOSSIER === itemId
    )[0].ETAT = `${props.id} ${props.rowId}`;

    props.setProjects(newProjects);
  };

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item: any, monitor) => updateProject(item.id),
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
            : theme.colors.yellow[0],
        }}
      >
        {props.projects
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
