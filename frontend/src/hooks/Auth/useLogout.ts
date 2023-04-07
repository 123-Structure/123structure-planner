import { changeFavicon, changeTabTitle } from "../../utils/tabsUtils";
import { useUpdateCustomerRoutes } from "../CustomerRoutes/useUpdateCustomerRoutes";
import { useUpdateRouter } from "../Router/useUpdateRouter";
import { useAuth } from "./useAuth";
import { useUpdateUserData } from "./useUpdateUserData";

export const useLogout = () => {
  const { updateAuth } = useAuth();
  const setRouter = useUpdateRouter();
  const setCustomerRoutes = useUpdateCustomerRoutes();
  const setUserData = useUpdateUserData();

  const logout = async () => {
    // Remove user from localStorage
    localStorage.removeItem("user");
    // Update AuthContext
    updateAuth({ type: "LOGOUT" });
    setUserData(undefined);
    setRouter("");
    setCustomerRoutes({
      commercial: "",
      category: "",
      customer: "",
      agency: "",
      appointment: "",
    });
    changeFavicon("🏡");
    changeTabTitle("123 Structure");
  };

  return {
    logout,
  };
};
