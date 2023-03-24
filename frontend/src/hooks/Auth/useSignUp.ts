import { useState } from "react";
import { useAuth } from "./useAuth";

export const useSignUp = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { updateAuth } = useAuth();

  const signUp = async (email: string, password: string) => {
    setIsLoading(true);
    setError("");
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/signUp`,
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }

    if (response.ok) {
      // Save the user to localStorage
      localStorage.setItem("user", JSON.stringify(data));
      // Update AuthContext
      updateAuth({ type: "LOGIN", payload: data });
      setIsLoading(false);
    }
  };

  return {
    signUp,
    isLoading,
    error,
  };
};
