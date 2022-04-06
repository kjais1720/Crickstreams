import { useEffect, useState } from "react";
import { HorizontalVideoCard, PlaylistModal } from "components";
import { NoVideosToShow } from "pages";
import { setDocumentTitle } from "utilities";

export function SinglePlaylistPage({
  playlistTitle,
  playlistVideos,
  clearHistoryBtn,
  deleteItemBtn,
}) {
  const pageTitle = `${playlistTitle} | Crickstreams`;
  setDocumentTitle(pageTitle);

  const [playlistModalState, setPlaylistModalState] = useState({
    show: false,
    selectedVideo: {},
  });
  const [playlistBanner, setPlaylistBanner] = useState({});
  const closePlaylistModal = () =>
    setPlaylistModalState({ show: false, selectedVideo: {} });

  useEffect(() => {
    playlistVideos[0] && setPlaylistBanner(playlistVideos[0].thumbnailHigh.url); //Variable
  }, [playlistVideos]);

  const totalVideos = playlistVideos.length;

  return totalVideos ? (
    <main className="flex-col pd-lg">
      {clearHistoryBtn ? (
        <div className="txt-right">
          <button
            className="tr-btn tr-btn-outline-error"
            onClick={clearHistoryBtn.clickHandler}
          >
            Clear All
          </button>
        </div>
      ) : (
        ""
      )}
      <div class="d-flex gap-xs f-wrap justify-c-center">
        <article className="tr-card pd-0 radius-xs bs-lighter align-s-start bg-secondary bd-none">
          <figure>
            <img className="radius-xs" src={playlistBanner} alt="History"></img>
          </figure>
          <div className="pd-sm">
            <h2>{playlistTitle}</h2>
            <p>{totalVideos} videos</p>
          </div>
        </article>
        <div className="horizontal-card-container flex-col gap-xs flex-1">
          {playlistVideos.map((video) => (
            <HorizontalVideoCard
              key={video._id}
              video={video}
              setPlaylistModalState={setPlaylistModalState}
              deleteButton={deleteItemBtn}
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
