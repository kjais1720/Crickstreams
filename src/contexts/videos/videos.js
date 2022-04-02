import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { useAxios } from "utilities";

const VideosContext = createContext({});

export const useVideos = () => useContext(VideosContext);

export function VideosProvider({ children }) {
  const [apiUrl, setApiUrl] = useState("/api/videos");
  const { serverResponse, isLoading, serverError } = useAxios(apiUrl);
  const videos = serverResponse.data?.videos || [];

  const filterVideos = (selectedCategory) =>
    videos.filter((video) => video.categoryName === selectedCategory);
  return (
    <VideosContext.Provider value={{ videos, isLoading, serverError, filterVideos }}>
      {children}
    </VideosContext.Provider>
  );
}
