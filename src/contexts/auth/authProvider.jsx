import { useContext, createContext, useReducer, useState } from "react";
import { authReducer } from "./reducer";

const AuthContext = createContext({ isLoggedIn: false, user: {} });

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [userState, userDispatch] = useReducer(authReducer, {
    isLoggedIn: false,
    user: {},
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  return (
    <AuthContext.Provider
      value={{ userState, userDispatch, showAuthModal, setShowAuthModal }}
    >
      {children}
    </AuthContext.Provider>
  );
}
