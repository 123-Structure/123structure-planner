import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { CustomerExample } from "../data/CustomerExample";
import { ICustomer } from "../data/interfaces/ICustomer";

const CustomerContext = createContext<ICustomer[]>([]);
const CustomerUpdateContext = createContext<
  Dispatch<SetStateAction<ICustomer[]>>
>(() => []);

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
  const [customers, setCustomer] = useState<ICustomer[]>(CustomerExample);

  return (
    <CustomerContext.Provider value={customers}>
      <CustomerUpdateContext.Provider value={setCustomer}>
        {props.children}
      </CustomerUpdateContext.Provider>
    </CustomerContext.Provider>
  );
};

export default CustomerProvider;
