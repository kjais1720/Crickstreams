import { useEffect, useReducer } from "react";
import { useAuth } from "contexts"
import axios from "axios";

const apiReducer = (state, { type, payload }) => {
  switch (type) {
    case "setData":
      return { ...state, serverResponse: payload, serverError: {} };
    case "setError":
      return { ...state, serverError: payload, serverResponse: {} };
    case "setLoadingTrue":
      return { ...state, isLoading: true };
    case "setLoadingFalse":
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

/**
 *
 * @param {string} apiUrl The Api URL
 * @param {string} method The HTTP requeest method
 * @param {object} postData The data to post to the backend
 * @param {string} authToken The JWT associated with a user
 * @returns {isLoading : loading state, serverResponse : response from server, serverError : Error from server}
 */
export const useAxios = (apiUrl, method = "get", postData) => {
  const [apiState, apiDispatch] = useReducer(apiReducer, {
    serverResponse: {},
    serverError: {},
    isLoading: false,
  });

  const { userState : {isLoggedIn} } = useAuth();
  useEffect(()=>{ //To update the encodedToken in the header everytime user logs in or logs out
    const userToken = localStorage.getItem("userToken");
    axios.interceptors.request.use(
      (config) => {
        config.headers.authorization = userToken //As a fallback if for some reason the token in localstorage is not removed ;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  },[isLoggedIn])

  const getData = async () => {
    const userToken = localStorage.getItem("userToken");
    try {
      apiDispatch({ type: "setLoadingTrue" });
      let res;
      switch (method) {
        case "get":
          res = await axios.get(apiUrl);
          break;
        case "post":
          res = await axios.post(apiUrl, postData);
          break;
        case "delete":
          res = await axios.delete(apiUrl);
        default:
          break;
      }
      apiDispatch({ type: "setData", payload: res });
    } catch (err) {
      apiDispatch({ type: "setError", payload: err });
    } finally {
      apiDispatch({ type: "setLoadingFalse" });
    }
  };
  useEffect(() => {
    if (apiUrl) {
      getData();
    }
  }, [apiUrl, postData]);
  return {
    isLoading: apiState.isLoading,
    serverResponse: apiState.serverResponse,
    serverError: apiState.serverError,
  };
};
