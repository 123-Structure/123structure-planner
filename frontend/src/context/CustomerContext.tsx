import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { ICustomer } from "../data/interfaces/ICustomer";

const CustomerContext = createContext<ICustomer | undefined>(undefined);
const CustomerUpdateContext = createContext<
  Dispatch<SetStateAction<ICustomer | undefined>>
>(() => {});

interface ICustomerContextProps {
  children: React.ReactNode;
}

export const useCustomer = () => {
  return useContext(CustomerContext);
};
export const useUpdateCustomer = () => {
  return useContext(CustomerUpdateContext);
};

const CustomerProvider = (props: ICustomerContextProps) => {
  const [customer, setCustomer] = useState<ICustomer>();

  return (
    <CustomerContext.Provider value={customer}>
      <CustomerUpdateContext.Provider value={setCustomer}>
        {props.children}
      </CustomerUpdateContext.Provider>
    </CustomerContext.Provider>
  );
};

export default CustomerProvider;
