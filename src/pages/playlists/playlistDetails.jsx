import { resourcesDispatchConstants } from "utilities";
import { SinglePlaylistPage, LoaderForComponent } from "components";
import { useParams, useNavigate } from "react-router";
import { useUserResources } from "contexts";
import { useEffect, useState } from "react";

export function PlaylistDetails() {
  const {playlistId} = useParams();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState({});
  const {
    userResources: { playlists },
    isLoading,
    userResourcesDispatch,
  } = useUserResources();

  const { REMOVE_FROM_PLAYLIST, REMOVE_PLAYLIST } = resourcesDispatchConstants;
  const removeFromPlaylist = (videoId) =>
    userResourcesDispatch({
      type: REMOVE_FROM_PLAYLIST,
      payload: `${playlistId}/${videoId}`,
    });

  const removePlaylist = () =>{
    userResourcesDispatch({ type: REMOVE_PLAYLIST, payload: playlistId });
    navigate(-1,{replace:true})
  }
  
  const removePlaylistBtn = {name:"Remove playlist", clickHandler:removePlaylist}
  const removeFromPlaylistBtn = {name:"Remove from playlist", clickHandler:removeFromPlaylist}

  useEffect(() => {
    const currentPlaylist = playlists.find(
      (playlist) => playlist._id === playlistId
    );
    currentPlaylist ? setPlaylist(currentPlaylist) : setPlaylist({});
  }, [playlists]);

  const { title = "", videos = [] } = playlist;
  return isLoading ? (
    <LoaderForComponent />
  ) : (
    <SinglePlaylistPage
      playlistTitle={title}
      playlistVideos={videos}
      playlistActionBtn={removePlaylistBtn}
      deleteItemBtn={removeFromPlaylistBtn}
    />
  );
}
