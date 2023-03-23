import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { IJwtPayload } from "../data/interfaces/IJwtPayload";
import { useAuth } from "../hooks/Auth/useAuth";
import { decodeJwt } from "../utils/decodeJwt";

export const UserDataContext = createContext<IJwtPayload | undefined>(
  undefined
);

export const UserDataUpdateContext = createContext<
  Dispatch<SetStateAction<IJwtPayload | undefined>>
>(() => {});

interface IUserDataContextProps {
  children: React.ReactNode;
}

const UserDataProvider = (props: IUserDataContextProps) => {
  const [userData, setUserData] = useState<IJwtPayload>();

  const { auth } = useAuth();

  useEffect(() => {
    if (auth.user) {
      const payload = decodeJwt(auth.user.token);
      setUserData(payload);
    } else {
      setUserData(undefined);
    }
  }, [auth.user]);

  // console.log("👷 UserData", userData);

  return (
    <UserDataContext.Provider value={userData}>
      <UserDataUpdateContext.Provider value={setUserData}>
        {props.children}
      </UserDataUpdateContext.Provider>
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
