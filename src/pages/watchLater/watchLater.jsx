import { useEffect, useState } from "react";
import { useUserResources, resourcesApiStateEnums } from "contexts";
import { HorizontalVideoCard, PlaylistModal } from "components";
import { NoVideosToShow } from "pages";
import { setDocumentTitle } from "utilities";

export function WatchLater() {
  const pageTitle = "Watch later | Crickstreams";
  setDocumentTitle(pageTitle);

  const {
    userResources: { watchlater },
  } = useUserResources();

  const [playlistModalState, setPlaylistModalState] = useState({
    show: false,
    selectedVideo: {},
  });
  const [playlistBanner, setPlaylistBanner] = useState({});
  const closePlaylistModal = () =>
    setPlaylistModalState({ show: false, selectedVideo: {} });

  useEffect(() => {
    watchlater[0] && setPlaylistBanner(watchlater[0].thumbnailHigh.url);
  }, [watchlater]);
  const totalVideos = watchlater.length;

  return watchlater.length ? (
    <main className="d-flex gap-xs justify-c-center pd-lg f-wrap">
      <article className="tr-card pd-0 radius-xs bs-lighter align-s-start bg-secondary bd-none">
        <figure>
          <img className="radius-xs" src={playlistBanner}></img>
        </figure>
        <div className="pd-sm">
          <h2>Your watchlater</h2>
          <p>{totalVideos} videos</p>
        </div>
      </article>
      <div className="horizontal-card-container flex-col gap-xs flex-1">
        {watchlater.map((video) => (
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
