import {
  useContext,
  createContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import { authReducer } from "./reducer";
import jwt_decode from "jwt-decode";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAxios, USER_TOKEN, authDispatchConstants } from "utilities";

const AuthContext = createContext({ isLoggedIn: false, user: {} });

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [userState, userDispatch] = useReducer(authReducer, {
    isLoggedIn: false,
    user: {},
  });
  const [authApiState, setAuthApiState] = useState({
    url: "",
    data: "",
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { LOGIN } = authDispatchConstants;
  useEffect(() => {
    // To get the user details everytime the page reloads, from the saved token in localstorage
    const encodedToken = localStorage.getItem(USER_TOKEN);
    if (encodedToken) {
      const decodedToken = jwt_decode(
        encodedToken,
        process.env.REACT_APP_JWT_SECRET
      );
      userDispatch({ type: LOGIN, payload: decodedToken });
    }
  }, []);

  const navigate = useNavigate();
  const location = useLocation()
  const pathToRedirectAfterLogin = location.state?.from?.pathname || location?.pathname || "/" ;

  const { serverResponse, isLoading, serverError } = useAxios(
    authApiState.url,
    "post",
    authApiState.data
  );
  useEffect(() => {
    if (serverResponse.status === 201 || serverResponse.status === 200) {
      const user = serverResponse.data.user;
      localStorage.setItem(USER_TOKEN, serverResponse.data.encodedToken);
      userDispatch({
        type: LOGIN,
        payload: {
          user,
        },
      });

      // Fire toast
      serverResponse.status === 200
        ? toast.success(`Logged in. Welcome back ${user.firstName}`)
        : toast.success(`Signed up. Welcome aboard ${user.firstName}`);
      setShowAuthModal(false);
      navigate(pathToRedirectAfterLogin);
    }
  }, [serverResponse, serverError]);

  const loginSignupHandler = (route, data) => {
    const requiredPostData = {
      email: data.email,
      password: data.password,
    };
    if (route === "/api/auth/signup") {
      requiredPostData.firstName = data.firstName;
      requiredPostData.lastName = data.lastName;
    }
    setAuthApiState({
      url: route,
      data: requiredPostData,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        userState,
        userDispatch,
        showAuthModal,
        setShowAuthModal,
        loginSignupHandler,
        serverResponse,
        serverError,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
