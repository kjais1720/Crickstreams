import { useUserResources, resourcesDispatchConstants } from "contexts";
import { SinglePlaylistPage } from "components";

export function WatchLater() {
  const pageTitle = "Watch later";
  const {
    userResources: { watchlater },
  } = useUserResources();
  return (
    <SinglePlaylistPage playlistTitle={pageTitle} playlistVideos={watchlater} />
  );
}
