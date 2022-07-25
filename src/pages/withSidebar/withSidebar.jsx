import { SideNav } from "components";
import { Routes, Route } from "react-router";
import {
  History,
  LikedVideos,
  Explore,
  Playlists,
  PlaylistDetails,
  NotFound,
  VideoPlayer,
  WatchLater,
} from "pages";
import { AuthMiddleware } from "authMiddleware";
import { VideosProvider, UserResourcesProvider } from "contexts";

export function WithSidebar({ categories }) {
  return (
    <div className="w-100 d-flex">
      <SideNav />
      <div className="flex-1 bg-secondary">
        <VideosProvider>
          <UserResourcesProvider>
            <Routes>
              <Route
                path="/explore"
                element={<Explore categories={categories} />}
              />
              <Route
                path="/explore/:category"
                element={<Explore categories={categories} />}
              />
              <Route path="/video/:id" element={<VideoPlayer />} />
              <Route element={<AuthMiddleware />}>
                <Route path="/liked-videos" element={<LikedVideos />} />
                <Route path="/history" element={<History />} />
                <Route path="/playlists" element={<Playlists />} />
                <Route
                  path="/playlists/:playlistId"
                  element={<PlaylistDetails />}
                />
                <Route path="/watch-later" element={<WatchLater />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </UserResourcesProvider>
        </VideosProvider>
      </div>
    </div>
  );
}
