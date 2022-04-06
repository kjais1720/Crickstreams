import { useEffect, useState } from "react";
import { useUserResources, resourcesApiStateEnums } from "contexts";
import { HorizontalVideoCard, PlaylistModal } from "components";
import { NoVideosToShow } from "pages";
import { setDocumentTitle } from "utilities";

export function LikedVideos() {
  const pageTitle = "Liked videos | Crickstreams";
  setDocumentTitle(pageTitle);

  const {
    userResources: { likes },
    resourceApiDispatch,
  } = useUserResources();
  const { REMOVE_FROM_LIKES } = resourcesApiStateEnums;

  const [playlistModalState, setPlaylistModalState] = useState({
    show: false,
    selectedVideo: {},
  });
  const [playlistBanner, setPlaylistBanner] = useState({});
  const closePlaylistModal = () =>
    setPlaylistModalState({ show: false, selectedVideo: {} });
  const removeFromLikes = (id) => {
    resourceApiDispatch({ type: REMOVE_FROM_LIKES, payload: id });
  };
  useEffect(() => {
    likes[0] && setPlaylistBanner(likes[0].thumbnailHigh.url);
  }, [likes]);
  const totalVideos = likes.length;

  return likes.length ? (
    <main className="d-flex gap-xs align-i-start pd-lg">
      <article
        className="tr-card pd-0 radius-xs bs-lighte align-s-start bg-secondary bd-none"
      >
        <figure>
          <img className="radius-xs" src={playlistBanner}></img>
        </figure>
        <div className="pd-sm">
          <h2>Liked Videos</h2>
          <p>{totalVideos} videos</p>
        </div>
      </article>
      <div className="horizontal-card-container flex-col gap-xs flex-1">
        {likes.map((video) => (
          <HorizontalVideoCard
            key={video._id}
            video={video}
            setPlaylistModalState={setPlaylistModalState}
          />
        ))}
      </div>
      {playlistModalState.show ? (
        <PlaylistModal
          selectedVideo={playlistModalState.selectedVideo}
          closePlaylistModal={closePlaylistModal}
        />
      ) : (
        ""
      )}
    </main>
  ) : (
    <NoVideosToShow />
  );
}
