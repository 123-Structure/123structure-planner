import { useContext } from "react";
import { RessourcesContext } from "../../context/RessourceContext";

export const useRessources = () => {
  return useContext(RessourcesContext);
};
