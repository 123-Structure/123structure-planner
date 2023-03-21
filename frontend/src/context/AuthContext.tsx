import { createContext,  useReducer } from "react";
import { IRessource } from "../data/interfaces/IRessource";

interface IAuthContextProps {
  children: React.ReactNode;
}

export interface IState {
  user: IRessource | null;
}

type Action = { type: "LOGIN"; payload: IRessource } | { type: "LOGOUT" };

const initialState: IState = {
  user: null,
};

export const AuthContext = createContext<{
  auth: IState;
  updateAuth: React.Dispatch<Action>;
}>({ auth: initialState, updateAuth: () => null });

export const authReducer = (state: IState, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };

    default:
      return state;
  }
};

const AuthProvider = (props: IAuthContextProps) => {
  const [auth, updateAuth] = useReducer(authReducer, initialState);

  // console.log("🔒 AuthContext state : ", auth);

  return (
    <AuthContext.Provider value={{ auth, updateAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
