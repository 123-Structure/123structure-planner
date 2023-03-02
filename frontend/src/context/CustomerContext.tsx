import { createContext, Dispatch, useContext, useReducer } from "react";
import { ICustomer } from "../data/interfaces/ICustomer";

interface ICustomerContextProps {
  children: React.ReactNode;
}

export interface IState {
  customersList: ICustomer[];
}

type Action =
  | { type: "SET_CUSTOMER"; payload: ICustomer[] }
  | { type: "ADD_CUSTOMER"; payload: ICustomer }
  | { type: "UPDATE_CUSTOMER"; payload: { id: string; customer: ICustomer } }
  | { type: "DELETE_CUSTOMER"; payload: string };

const initialState: IState = {
  customersList: [],
};

const CustomerContext = createContext<{
  customers: IState;
  updateCustomers: React.Dispatch<Action>;
}>({ customers: initialState, updateCustomers: () => null });

export const useCustomers = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw Error("useCustomers must be used inside an CustomerProvider");
  }
  return context;
};

const reducer = (state: IState, action: Action): IState => {
  switch (action.type) {
    case "SET_CUSTOMER":
      return { customersList: action.payload };
    case "ADD_CUSTOMER":
      return { customersList: [...state.customersList, action.payload] };
    case "UPDATE_CUSTOMER":
      const updatedCustomers = state.customersList.map((customer) =>
        customer._id === action.payload.id ? action.payload.customer : customer
      );
      return { customersList: updatedCustomers };
    case "DELETE_CUSTOMER":
      const filteredCustomers = state.customersList.filter(
        (customer) => customer._id !== action.payload
      );
      return { customersList: filteredCustomers };
    default:
      return state;
  }
};

const CustomerProvider = (props: ICustomerContextProps) => {
  const [customers, updateCustomers] = useReducer(reducer, initialState);

  return (
    <CustomerContext.Provider value={{ customers, updateCustomers }}>
      {props.children}
    </CustomerContext.Provider>
  );
};

export default CustomerProvider;
