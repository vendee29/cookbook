import * as React from "react";
import { useAuthContext } from "./useAuthContext";
import { AuthActionKind } from "../context/AuthContext";

export const useLogin = () => {
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    console.log(response)
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
  return { login, isLoading, error };
};
