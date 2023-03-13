import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { IRessource } from "../data/interfaces/IRessource";

const AuthContext = createContext<IRessource | undefined>(undefined);
const AuthUpdateContext = createContext<
  Dispatch<SetStateAction<IRessource | undefined>>
>(() => {});

interface IProjectContextProps {
  children: React.ReactNode;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
export const useUpdateAuth = () => {
  return useContext(AuthUpdateContext);
};

const AuthProvider = (props: IProjectContextProps) => {
  const [auth, setAuth] = useState<IRessource | undefined>(undefined);

  return (
    <AuthContext.Provider value={auth}>
      <AuthUpdateContext.Provider value={setAuth}>
        {props.children}
      </AuthUpdateContext.Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
