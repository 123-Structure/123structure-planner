import { createContext, Dispatch, SetStateAction, useState } from "react";

interface ICustomerRoutes {
  commercial: string;
  category: string;
  customer: string;
  agency: string;
  appointment: string;
}

const defaultCustomerRoutes = {
  commercial: "",
  category: "",
  customer: "",
  agency: "",
  appointment: "",
};

export const CustomerRoutesContext = createContext<ICustomerRoutes>(
  defaultCustomerRoutes
);

export const CustomerRoutesUpdateContext = createContext<
  Dispatch<SetStateAction<ICustomerRoutes>>
>(() => {});

interface IProjectContextProps {
  children: React.ReactNode;
}

const CustomerRoutesProvider = (props: IProjectContextProps) => {
  const [customerRoutes, setCustomerRoutes] = useState<ICustomerRoutes>(
    defaultCustomerRoutes
  );

  return (
    <CustomerRoutesContext.Provider value={customerRoutes}>
      <CustomerRoutesUpdateContext.Provider value={setCustomerRoutes}>
        {props.children}
      </CustomerRoutesUpdateContext.Provider>
    </CustomerRoutesContext.Provider>
  );
};

export default CustomerRoutesProvider;
