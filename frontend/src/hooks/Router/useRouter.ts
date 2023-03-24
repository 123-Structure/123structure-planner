import { useContext } from "react";
import { RouterContext } from "../../context/RouterContext";

export const useRouter = () => {
  return useContext(RouterContext);
};
