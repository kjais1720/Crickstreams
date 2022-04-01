import { SideNav } from "components";
import { Routes, Route } from "react-router";
import {
  History,
  Auth,
  LikedVideos,
  VideoListing,
  Playlists,
} from "pages";
import { VideosProvider } from "contexts";

export function AppPages() {
  return (
    <div className="w-100 d-flex">
      <SideNav />
      <div class="flex-1 bg-secondary">
        <VideosProvider>
          <Routes>
            <Route path="/explore" element={<VideoListing />} /> {/* To Show all Videos */}
            <Route path="/explore/:category" element={<VideoListing />} />
          </Routes>
        </VideosProvider>
        <Routes>
          <Route path="/history" element={<History />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/liked-videos" element={<LikedVideos />} />
          <Route path="/playlists" element={<Playlists />} />
        </Routes>
      </div>
    </div>
  );
}
