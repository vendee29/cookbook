import { AuthActionKind } from "../context/AuthContext";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: AuthActionKind.LOGOUT, payload: null });
  };
  return { logout };
};
