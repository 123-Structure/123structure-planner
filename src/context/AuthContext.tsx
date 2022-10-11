import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

const AuthContext = createContext<boolean>(false);
const AuthUpdateContext = createContext<
  Dispatch<SetStateAction<boolean>>
>(() => true);

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
  const [auth, setAuth] = useState<boolean>(false);

  return (
    <AuthContext.Provider value={auth}>
      <AuthUpdateContext.Provider value={setAuth}>
        {props.children}
      </AuthUpdateContext.Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
