import { Routes, Route } from "react-router";
import { Home, History, Auth, LikedVideos, VideoListing, Playlists, NotFound } from "pages";

export function AllRoutes(){
  return(
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/history" element={<History/>} />
      <Route path="/auth" element={<Auth/>} />
      <Route path="/liked-videos" element={<LikedVideos/>} />
      <Route path="/explore" element={<VideoListing/>} />
      <Route path="playlists" element={<Playlists/>} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
  )
}