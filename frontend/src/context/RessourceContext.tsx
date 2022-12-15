import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { RessourceData } from "../data/constants/RessourceData";
import { IRessource } from "../data/interfaces/IRessource";

const RessourcesContext = createContext<IRessource[]>([]);
const RessourcesUpdateContext = createContext<
  Dispatch<SetStateAction<IRessource[]>>
>(() => []);

interface IProjectContextProps {
  children: React.ReactNode;
}

export const useRessources = () => {
  return useContext(RessourcesContext);
};
export const useUpdateRessources = () => {
  return useContext(RessourcesUpdateContext);
};

const RessourceProvider = (props: IProjectContextProps) => {
  const [ressources, setRessources] = useState<IRessource[]>(RessourceData);

  return (
    <RessourcesContext.Provider value={ressources}>
      <RessourcesUpdateContext.Provider value={setRessources}>
        {props.children}
      </RessourcesUpdateContext.Provider>
    </RessourcesContext.Provider>
  );
};

export default RessourceProvider;
