import { useContext, createContext, useReducer, useState, useEffect } from "react";
import { authReducer } from "./reducer";
import jwt_decode from "jwt-decode";
import axios from 'axios';


const AuthContext = createContext({ isLoggedIn: false, user: {} });

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [userState, userDispatch] = useReducer(authReducer, {
    isLoggedIn: false,
    user: {},
  });

  useEffect(()=>{ // To get the user details everytime the page reloads, from the saved token in localstorage
    const encodedToken= localStorage.getItem('userToken');
    if(encodedToken){
      const decodedToken = jwt_decode(
        encodedToken,
        process.env.REACT_APP_JWT_SECRET
      );
      userDispatch({type:"login",payload:decodedToken})
    }
  },[])

  const [showAuthModal, setShowAuthModal] = useState(false);
  return (
    <AuthContext.Provider
      value={{ userState, userDispatch, showAuthModal, setShowAuthModal }}
    >
      {children}
    </AuthContext.Provider>
  );
}
