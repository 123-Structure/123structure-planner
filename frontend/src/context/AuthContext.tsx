import { createContext, useEffect, useReducer } from "react";
import { IRessource } from "../data/interfaces/IRessource";
import { decodeJwt } from "../utils/decodeJwt";

interface IAuthContextProps {
  children: React.ReactNode;
}

export interface IState {
  user: { email: string; token: string } | null;
}

type Action =
  | { type: "LOGIN"; payload: { email: string; token: string } }
  | { type: "LOGOUT" };

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

  useEffect(() => {
    const localStorageItem = localStorage.getItem("user");
    if (localStorageItem !== null) {
      const user = JSON.parse(localStorageItem);

      // const decode = decodeJwt(user.token);

      // if (decode) {
      //   console.log(decode.iat, decode?.exp);

      //   console.log(
      //     new Date((decode?.iat * 1000) as number).toUTCString(),
      //     new Date((decode?.exp * 1000) as number).toUTCString()
      //   );
      // }

      if (user) {
        updateAuth({ type: "LOGIN", payload: user });
      }
    }
  }, []);

  // console.log("🔒 AuthContext state : ", auth);

  return (
    <AuthContext.Provider value={{ auth, updateAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
