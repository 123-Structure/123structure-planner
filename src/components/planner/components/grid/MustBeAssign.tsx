import { Tooltip, useMantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../../../data/constants/ItemTypes";
import { IProject } from "../../../../data/interfaces/IProject";
import ProjectCard from "../ProjectCard/ProjectCard";

interface INewEntryProps {
  projects: IProject[];
  setProjects: React.Dispatch<React.SetStateAction<IProject[]>>;
}

const MustBeAssign = (props: INewEntryProps) => {
  const theme = useMantineTheme();

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item: any, monitor) => updateProject(item.id, "mustBeAssign"),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const updateProject = (itemId: any, newValue: string) => {
    const newProjects = [...props.projects];

    const changedProject = newProjects.filter(
      (project) =>
        project.DOSSIER === itemId &&
        (project.ETAT === "newEntry" || project.ETAT === "mustBeAssign")
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
      props.setProjects(newProjects);
    }
  };

  return (
    <Tooltip
      label={"Projet(s) à attribuer"}
      position="bottom-start"
      color="gray"
      transition="slide-up"
      transitionDuration={300}
      openDelay={1000}
      style={{ fontWeight: "bold" }}
      withArrow
      arrowSize={8}
    >
      <div
        className="mustBeAssign"
        ref={drop}
        style={{
          backgroundColor: isOver
            ? theme.colors.yellow[3]
            : theme.colors.yellow[0],
        }}
      >
        {props.projects
          .filter((project) => project.ETAT === "mustBeAssign")
          .map((filteredProjects, index) => (
            <ProjectCard key={index} project={filteredProjects} />
          ))}
      </div>
    </Tooltip>
  );
};

export default MustBeAssign;
