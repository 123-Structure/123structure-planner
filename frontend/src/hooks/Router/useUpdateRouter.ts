import { useContext } from "react";
import { RouterUpdateContext } from "../../context/RouterContext";

export const useUpdateRouter = () => {
  return useContext(RouterUpdateContext);
};
