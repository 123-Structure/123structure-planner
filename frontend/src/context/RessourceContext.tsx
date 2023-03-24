import { createContext, Dispatch, SetStateAction, useState } from "react";
import { RessourceData } from "../data/constants/RessourceData";
import { IRessource } from "../data/interfaces/IRessource";

export const RessourcesContext = createContext<IRessource[]>([]);
export const RessourcesUpdateContext = createContext<
  Dispatch<SetStateAction<IRessource[]>>
>(() => []);

interface IProjectContextProps {
  children: React.ReactNode;
}

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
