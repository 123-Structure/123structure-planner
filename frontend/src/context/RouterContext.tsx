import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useUserData } from "../hooks/Auth/useUserData";

type TRouter = "Planning" | "Commercial" | "Administrateur" | "";

export const RouterContext = createContext<TRouter>("");
export const RouterUpdateContext = createContext<
  Dispatch<SetStateAction<TRouter>>
>(() => []);

interface IRouterContextProps {
  children: React.ReactNode;
}

const RouterProvider = (props: IRouterContextProps) => {
  const [Router, setRouter] = useState<TRouter>("");

  const userData = useUserData();

  useEffect(() => {
    const getRoute = () => {
      if (userData) {
        const role = userData.role;

        if (role.includes("Administrateur")) {
          setRouter("Administrateur");
        }
        if (role.includes("Dessinateur") || role.includes("Dessinateur")) {
          setRouter("Planning");
        }
        if (role.includes("Commercial")) {
          setRouter("Commercial");
        }
        setRouter("");
      }
    };
    getRoute();
  }, []);

  return (
    <RouterContext.Provider value={Router}>
      <RouterUpdateContext.Provider value={setRouter}>
        {props.children}
      </RouterUpdateContext.Provider>
    </RouterContext.Provider>
  );
};

export default RouterProvider;
