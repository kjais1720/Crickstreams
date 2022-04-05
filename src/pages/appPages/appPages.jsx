import { SideNav } from "components";
import { Routes, Route } from "react-router";
import {
  History,
  LikedVideos,
  VideoListing,
  Playlists,
  NotFound,
  VideoPlayer,
} from "pages";
import { AuthMiddleware } from "authMiddleware";
import { VideosProvider, UserResourcesProvider } from "contexts";

export function AppPages({ categories }) {
  return (
    <div className="w-100 d-flex">
      <SideNav />
      <div className="flex-1 bg-secondary">
        <VideosProvider>
          <UserResourcesProvider>
            <Routes>
              <Route
                path="/explore"
                element={<VideoListing categories={categories} />}
              />
              <Route
                path="/explore/:category"
                element={<VideoListing categories={categories} />}
              />
              <Route
                path="/video/:id"
                element={<VideoPlayer/>}
              />
              <Route element={<AuthMiddleware />}>
                <Route path="/liked-videos" element={<LikedVideos />} />
                <Route path="/history" element={<History />} />
                <Route path="/playlists" element={<Playlists />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </UserResourcesProvider>
        </VideosProvider>
      </div>
    </div>
  );
}
