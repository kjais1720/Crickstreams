import { useEffect, useState } from "react";
import { useUserResources, resourcesApiStateEnums } from "contexts";
import { HorizontalVideoCard, PlaylistModal } from "components";
import { NoVideosToShow } from "pages";
import { setDocumentTitle } from "utilities";

export function History() {
  const pageTitle = "Liked videos | Crickstreams";
  setDocumentTitle(pageTitle);

  const {
    userResources: { history },
    userResourcesDispatch,
  } = useUserResources();
  const { REMOVE_FROM_HISTORY, CLEAR_HISTORY } = resourcesApiStateEnums;

  const [playlistModalState, setPlaylistModalState] = useState({
    show: false,
    selectedVideo: {},
  });
  const [playlistBanner, setPlaylistBanner] = useState({});
  const closePlaylistModal = () =>
    setPlaylistModalState({ show: false, selectedVideo: {} });

  const removeFromhistory = (id) =>
    userResourcesDispatch({ type: REMOVE_FROM_HISTORY, payload: id });
  const clearHistory = () => userResourcesDispatch({ type: CLEAR_HISTORY });

  useEffect(() => {
    history[0] && setPlaylistBanner(history[0].thumbnailHigh.url);
  }, [history]);
  const totalVideos = history.length;

  return history.length ? (
    <main className="pd-lg flex-col">
      <div className="txt-right">
        <button className="tr-btn tr-btn-outline-error" onClick={clearHistory}>
          Clear All
        </button>
      </div>
      <div class="d-flex gap-xs">
        <article className="tr-card pd-0 radius-xs bs-lighter align-s-start bg-primary bd-none">
          <figure>
            <img className="radius-xs" src={playlistBanner}></img>
          </figure>
          <div className="pd-sm">
            <h2>History</h2>
            <p>{totalVideos} videos</p>
          </div>
        </article>
        <div className="flex-col gap-xs flex-1">
          {history.map((video) => (
            <HorizontalVideoCard
              key={video._id}
              video={video}
              setPlaylistModalState={setPlaylistModalState}
              deleteButton={{ clickHandler: removeFromhistory }}
            />
          ))}
        </div>
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
