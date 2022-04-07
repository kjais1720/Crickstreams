import {
  useContext,
  createContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { useAuth } from "contexts";
import axios from "axios";
import { toast } from "react-toastify";
import { apiReducer } from "./reducer";
import { useAxios } from "utilities";

const getUserResources = (apiRoute) => axios.get(apiRoute);

const defaultResourcesState = {
  playlists: [],
  likes: [],
  history: [],
  watchlater: [],
};

const defaultApiState = {
  url: "",
  method: "",
  data: "",
  toastMessage: "",
  toatType: "",
};

const UserResourcesContext = createContext(defaultResourcesState);

export const useUserResources = () => useContext(UserResourcesContext);

export function UserResourcesProvider({ children }) {
  const {
    userState: { isLoggedIn },
  } = useAuth();

  const [userResources, setUserResources] = useState(defaultResourcesState);

  const [resourcesApiState, userResourcesDispatch] = useReducer(
    apiReducer,
    defaultApiState
  );
  const { serverResponse, serverError, isLoading } = useAxios(
    resourcesApiState.url,
    resourcesApiState.method,
    resourcesApiState.data
  );
  useEffect(() => {
    const { data } = serverResponse;
    if (data?.playlists) {
      setUserResources((prev) => ({ ...prev, playlists: data.playlists }));
    } else if (data?.likes) {
      setUserResources((prev) => ({ ...prev, likes: data.likes }));
    } else if (data?.history) {
      setUserResources((prev) => ({ ...prev, history: data.history }));
    } else if (data?.watchlater) {
      setUserResources((prev) => ({ ...prev, watchlater: data.watchlater }));
    } else if (data?.playlist) {
      const updatedPlaylistId = data.playlist._id;
      const updatedPlaylists = userResources.playlists.map((playlist) =>
        playlist._id === updatedPlaylistId ? { ...data.playlist } : playlist
      );
      setUserResources((prev) => ({ ...prev, playlists: updatedPlaylists }));
    }
  }, [serverResponse, serverError]);

  useEffect(() => { //To get/clear all the user resources whenever the user logs in/out
    if (isLoggedIn) {
      Promise.all([
        getUserResources("/api/user/playlists"),
        getUserResources("/api/user/likes"),
        getUserResources("/api/user/history"),
        getUserResources("/api/user/watchlater"),
      ])
        .then((values) => {
          const data = values.map(
            (res, idx) => res.data[Object.keys(userResources)[idx]]
          ); // To take out corresponding data of each promise
          const updatedUserResources = {};
          [
            updatedUserResources.playlists,
            updatedUserResources.likes,
            updatedUserResources.history,
            updatedUserResources.watchlater,
          ] = data;
          setUserResources(updatedUserResources);
        })
        .catch((err) => console.log(err));
    } else {
      setUserResources(defaultResourcesState);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (serverError.error) {
      toast.error("An Error occured, please retry.");
      userResourcesDispatch({ type: "CLEAR_TOAST" });
    } else if (resourcesApiState.toastMessage && !isLoading) {
      toast[resourcesApiState.toastType](resourcesApiState.toastMessage);
      userResourcesDispatch({ type: "CLEAR_TOAST" });
    }
  }, [isLoading, resourcesApiState.toastMessage]);
  return (
    <UserResourcesContext.Provider
      value={{ userResources, userResourcesDispatch, isLoading, serverError }}
    >
      {children}
    </UserResourcesContext.Provider>
  );
}
