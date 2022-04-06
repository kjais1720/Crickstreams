import { useUserResources, resourcesDispatchConstants } from "contexts";
import { SinglePlaylistPage } from "components";

export function LikedVideos() {
  const pageTitle = "Liked Videos";
  const {
    userResources: { likes },
  } = useUserResources();
  return (
    <SinglePlaylistPage playlistTitle={pageTitle} playlistVideos={likes} />
  );
}
