import { useContext } from "react";
import { RessourcesUpdateContext } from "../../context/RessourceContext";

export const useUpdateRessources = () => {
  return useContext(RessourcesUpdateContext);
};
