import { useContext } from "react";
import { CustomerRoutesContext } from "../../context/CustomerRoutes";

export const useCustomerRoutes = () => {
  return useContext(CustomerRoutesContext);
};
