import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ICustomerRoutes {
  category: string;
  customer: string;
  agency: string;
  appointment: string;
}

const defaultCustomerRoutes = {
  category: "",
  customer: "",
  agency: "",
  appointment: "",
};

const CustomerRoutesContext = createContext<ICustomerRoutes>(
  defaultCustomerRoutes
);
const CustomerRoutesUpdateContext = createContext<
  Dispatch<SetStateAction<ICustomerRoutes>>
>(() => {});

interface IProjectContextProps {
  children: React.ReactNode;
}

export const useCustomerRoutes = () => {
  return useContext(CustomerRoutesContext);
};
export const useUpdateCustomerRoutes = () => {
  return useContext(CustomerRoutesUpdateContext);
};

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
