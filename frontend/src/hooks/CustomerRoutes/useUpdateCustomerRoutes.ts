import { useContext } from "react";
import { CustomerRoutesUpdateContext } from "../../context/CustomerRoutes";

export const useUpdateCustomerRoutes = () => {
  return useContext(CustomerRoutesUpdateContext);
};
