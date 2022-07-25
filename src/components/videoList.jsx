import { useState } from "react";
import { PlaylistModal, VideoCard } from "components";
export function VideoList({ videos }) {
  const [playlistModalState, setPlaylistModalState] = useState({
    show: false,
    selectedVideo: {},
  });
  const closePlaylistModal = () =>
    setPlaylistModalState({ show: false, selectedVideo: {} });
  return (
    <>
      <div className="d-grid grid-autofit-md justify-i-center gap-sm">
        {videos.map((video) => (
          <VideoCard
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
    </>
  );
}
