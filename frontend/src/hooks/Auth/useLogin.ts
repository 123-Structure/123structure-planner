import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { IRessource } from "../../data/interfaces/IRessource";
import { useAuth } from "./useAuth";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { updateAuth } = useAuth();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/login`,
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = (await response.json()) as IRessource | any;

    if (!response.ok) {
      setIsLoading(false);
      showNotification({
        title: "⛔ Une erreur est survenue",
        message: data.error,
        color: "red",
      });
      return data.error;
    }

    if (response.ok) {
      // Save the user to localStorage
      localStorage.setItem("user", JSON.stringify(data));
      // Update AuthContext
      updateAuth({ type: "LOGIN", payload: data });
      setIsLoading(false);
      showNotification({
        title: "🎉 Connexion réussi",
        message: `Bonjour, ${data.firstName} ${data.lastName}`,
        color: "green",
      });
    }
  };

  return {
    login,
    isLoading,
  };
};
