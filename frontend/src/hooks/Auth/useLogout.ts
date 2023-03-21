import { useAuth } from "./useAuth";

export const useLogout = () => {
  const { updateAuth } = useAuth();

  const logout = async () => {
    // Remove user from localStorage
    localStorage.removeItem("user");
    // Update AuthContext
    updateAuth({ type: "LOGOUT" });
  };

  return {
    logout,
  };
};
