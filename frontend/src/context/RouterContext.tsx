import { createContext, Dispatch, SetStateAction, useState } from "react";

type TRouter = "Planning" | "Commercial" | "Administrateur" | "";

export const RouterContext = createContext<TRouter>("");
export const RouterUpdateContext = createContext<
  Dispatch<SetStateAction<TRouter>>
>(() => []);

interface IRouterContextProps {
  children: React.ReactNode;
}

const RouterProvider = (props: IRouterContextProps) => {
  const [router, setRouter] = useState<TRouter>("");

  return (
    <RouterContext.Provider value={router}>
      <RouterUpdateContext.Provider value={setRouter}>
        {props.children}
      </RouterUpdateContext.Provider>
    </RouterContext.Provider>
  );
};

export default RouterProvider;
