import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { IProject } from "../data/interfaces/IProject";
import { ProjectExample } from "../data/ProjectExample";

const ProjectContext = createContext<IProject[]>([]);
const ProjectUpdateContext = createContext<
  Dispatch<SetStateAction<IProject[]>>
>(() => []);

interface IProjectContext {
  children: React.ReactNode;
}

export const useProject = () => {
  return useContext(ProjectContext);
};
export const useUpdateProject = () => {
  return useContext(ProjectUpdateContext);
};

const ProjectProvider = (props: IProjectContext) => {
  const [projects, setProjects] = useState<IProject[]>(
    ProjectExample.filter((p) => {
      return p.CLIENT !== "I.G.C." || !p.AFFAIRE.includes("(PT)");
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
