import { useContext } from "react";
import { UserDataContext } from "../../context/UserDataContext";

export const useUserData = () => {
  return useContext(UserDataContext);
};
