import { SideNav } from "components";
import { Routes, Route } from "react-router";
import {
  History,
  Auth,
  LikedVideos,
  VideoListing,
  Playlists,
  NotFound,
} from "pages";
import { AuthMiddleware } from "authMiddleware";
import { VideosProvider } from "contexts";

export function AppPages({ categories }) {
  return (
    <div className="w-100 d-flex">
      <SideNav />
      <div className="flex-1 bg-secondary">
        <VideosProvider>
          <Routes>
            <Route
              path="/explore"
              element={<VideoListing categories={categories} />}
            />{" "}
            {/* To Show all Videos */}
            <Route
              path="/explore/:category"
              element={<VideoListing categories={categories} />}
            />
            <Route element={<AuthMiddleware />}>
              <Route path="/liked-videos" element={<LikedVideos />} />
              <Route path="/history" element={<History />} />
              <Route path="/playlists" element={<Playlists />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </VideosProvider>
      </div>
    </div>
  );
}
