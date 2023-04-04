import { useUpdateCustomerRoutes } from "../CustomerRoutes/useUpdateCustomerRoutes";
import { useUpdateRouter } from "../Router/useUpdateRouter";
import { useAuth } from "./useAuth";

export const useLogout = () => {
  const { updateAuth } = useAuth();
  const setRouter = useUpdateRouter();
  const setCustomerRoutes = useUpdateCustomerRoutes();

  const logout = async () => {
    // Remove user from localStorage
    localStorage.removeItem("user");
    // Update AuthContext
    updateAuth({ type: "LOGOUT" });
    setRouter("");
    setCustomerRoutes({
      commercial: "",
      category: "",
      customer: "",
      agency: "",
      appointment: "",
    });
  };

  return {
    logout,
  };
};
