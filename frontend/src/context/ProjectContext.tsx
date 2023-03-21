import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { IProject } from "../data/interfaces/IProject";
import { ProjectExample } from "../data/ProjectExample";

export const ProjectContext = createContext<IProject[]>([]);

export const ProjectUpdateContext = createContext<
  Dispatch<SetStateAction<IProject[]>>
>(() => []);

interface IProjectContextProps {
  children: React.ReactNode;
}

const ProjectProvider = (props: IProjectContextProps) => {
  const [projects, setProjects] = useState<IProject[]>(
    ProjectExample.filter((p) => {
      return (
        (p.CLIENT !== "I.G.C." || !p.AFFAIRE.includes("(PT)")) &&
        (p.PHASE === "AVP" || p.PHASE === "EXE")
      );
    })
  );

  return (
    <ProjectContext.Provider value={projects}>
      <ProjectUpdateContext.Provider value={setProjects}>
        {props.children}
      </ProjectUpdateContext.Provider>
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;
