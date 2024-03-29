import { useEffect, useReducer } from "react";
import { USER_TOKEN } from "utilities";
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

  axios.interceptors.request.use(
    (config) => {
      const userToken = localStorage.getItem(USER_TOKEN);
      config.headers.authorization = userToken;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getData = async () => {
    try {
      apiDispatch({ type: "setLoadingTrue" });
      let res;
      res = await axios({
        url:apiUrl,
        method:method,
        data:postData
      })
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
