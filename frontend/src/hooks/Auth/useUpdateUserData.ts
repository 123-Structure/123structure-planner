import { useContext } from "react";
import { UserDataUpdateContext } from "../../context/UserDataContext";

export const useUpdateUserData = () => {
  return useContext(UserDataUpdateContext);
};
