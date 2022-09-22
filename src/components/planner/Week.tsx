import { useDrop } from "react-dnd";
import { ItemTypes } from "../../utils/constant/ItemTypes";
import { IProject } from "../../utils/interface/IProject";
import ProjectCard from "./projectCard/ProjectCard";

interface IWeekProps {
  id: string;
  rowId: string;
  projects: IProject[];
  setProjects: React.Dispatch<React.SetStateAction<IProject[]>>;
}

const Week = (props: IWeekProps) => {
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
    <div
      className="week"
      id={props.id}
      ref={drop}
      style={{
        backgroundColor: isOver ? "#ffcc00" : "",
        filter: isOver ? "brightness(115%)" : "",
      }}
    >
      {props.projects
        .filter((project) => project.ETAT.includes(props.id))
        .filter((project) => project.ETAT.includes(props.rowId))
        .map((filteredProjects, index) => (
          <ProjectCard key={index} project={filteredProjects} />
        ))}
    </div>
  );
};

export default Week;
