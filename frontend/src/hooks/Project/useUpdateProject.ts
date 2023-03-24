import { useContext } from "react";
import { ProjectUpdateContext } from "../../context/ProjectContext";

export const useUpdateProject = () => {
  return useContext(ProjectUpdateContext);
};
