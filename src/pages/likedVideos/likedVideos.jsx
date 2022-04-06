import { useUserResources, resourcesApiStateEnums } from "contexts";
import { PlaylistPage } from "components";

export function LikedVideos() {
  const pageTitle = "Liked Videos"
  const {
    userResources: { likes },
  } = useUserResources();
  return(<PlaylistPage playlistTitle={pageTitle} playlistVideos = {likes} />)
}
