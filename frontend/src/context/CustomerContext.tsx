import { createContext, Dispatch, SetStateAction, useState } from "react";
import { ICustomer } from "../data/interfaces/ICustomer";

export const CustomerContext = createContext<ICustomer | undefined>(undefined);

export const CustomerUpdateContext = createContext<
  Dispatch<SetStateAction<ICustomer | undefined>>
>(() => {});

interface ICustomerContextProps {
  children: React.ReactNode;
}

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
