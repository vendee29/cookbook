import * as React from "react";
import { User } from "../utils/types";

export enum AuthActionKind {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

interface AuthAction {
  type: AuthActionKind;
  payload: User | null;
}

interface AuthState {
  user: User | null;
}

type AuthContextValue = {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
};

export const AuthContext = React.createContext<AuthContextValue | null>(null);

export const authReducer = (state: AuthState, action: AuthAction) => {
  const { type, payload } = action;
  switch (type) {
    case AuthActionKind.LOGIN:
      return { user: payload };
    case AuthActionKind.LOGOUT:
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(authReducer, {
    user: null,
  });

  React.useEffect(() => {
    const userInStorage = localStorage.getItem("user")
    if(userInStorage) {
      const user: User = JSON.parse(userInStorage)
      dispatch({type: AuthActionKind.LOGIN, payload: user})
    }
  }, [])

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};
