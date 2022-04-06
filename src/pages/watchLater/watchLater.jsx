import { useUserResources, resourcesApiStateEnums } from "contexts";
import { PlaylistPage } from "components";

export function WatchLater() {
  const pageTitle = "Watch later"
  const {
    userResources: { watchlater },
  } = useUserResources();
  return(<PlaylistPage playlistTitle={pageTitle} playlistVideos = {watchlater} />)
}
