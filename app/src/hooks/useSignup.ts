import * as React from "react";
import { useAuthContext } from "./useAuthContext";
import { AuthActionKind } from "../context/AuthContext";

export const useSignup = () => {
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    } else {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: AuthActionKind.LOGIN, payload: json });

      setIsLoading(false);
      setError(null);
    }
  };
  return { signup, isLoading, error };
};
