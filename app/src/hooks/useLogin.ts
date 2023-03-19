import * as React from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";
import { AuthActionKind } from "../context/AuthContext";
import { User } from "../utils/types";

export const useLogin = () => {
  const [error, setError] = React.useState<null | string>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post<User>(
        "/api/user/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          validateStatus(status) {
            return status === 200;
          },
        }
      );
      const json = response.data;

      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: AuthActionKind.LOGIN, payload: json });

      setIsLoading(false);
      setError(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.error);
      } else {
        setError("Something went wrong...");
      }
      setIsLoading(false);
    }
  };
  return { login, isLoading, error };
};
