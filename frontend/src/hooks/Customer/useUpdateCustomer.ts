import { useContext } from "react";
import { CustomerUpdateContext } from "../../context/CustomerContext";

export const useUpdateCustomer = () => {
  return useContext(CustomerUpdateContext);
};
