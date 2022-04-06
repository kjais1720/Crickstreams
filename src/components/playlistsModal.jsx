import { useState } from "react";
import { useUserResources, resourcesDispatchConstants } from "contexts";

export function PlaylistModal({ selectedVideo, closePlaylistModal }) {
  const {
    userResourcesDispatch,
    userResources: { playlists },
  } = useUserResources();
  const { ADD_TO_PLAYLIST, ADD_NEW_PLAYLIST, REMOVE_FROM_PLAYLIST } =
    resourcesDispatchConstants;
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const createPlaylist = () => {
    newPlaylistName &&
      userResourcesDispatch({
        type: ADD_NEW_PLAYLIST,
        payload: { title: newPlaylistName },
      });
    setNewPlaylistName("");
  };
  const optionClick = (e, playlistId) => {
    const { checked } = e.target;
    if (checked) {
      userResourcesDispatch({
        type: ADD_TO_PLAYLIST,
        payload: { playlistId: playlistId, video: selectedVideo },
      });
    } else {
      userResourcesDispatch({
        type: REMOVE_FROM_PLAYLIST,
        payload: `${playlistId}/${selectedVideo._id}`,
      });
    }
  };

  const updateNewPlaylistName = (e) => {
    const { value } = e.target;
    setNewPlaylistName(value);
  };

  const createOptions = ({ title, _id, videos }) => {
    const videoPresentInPlaylist = videos.some(
      (item) => item._id === selectedVideo._id
    );
    return (
      <label key={_id} className="tr-btn tr-btn-transparent d-flex gap-xs">
        <input
          className="tr-input-radio"
          name="option"
          type="checkbox"
          checked={videoPresentInPlaylist}
          onChange={(e) => optionClick(e, _id)}
        />
        {title}
      </label>
    );
  };
  return (
    <article
      className={`tr-modal-wrapper p-fixed flex-center`}
      onClick={closePlaylistModal}
    >
      <div
        className="tr-modal-box flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="tr-modal-text d-flex gap-xs justify-c-space-between align-i-center">
          <h2 className="modal-title">Add to..</h2>
          <button
            onClick={closePlaylistModal}
            className="pd-xs bd-none bg-transparent txt-accent txt-lg txt-lighter"
          >
            <i className="fas fa-times txt-light"></i>
          </button>
        </div>

        <div className="tr-modal-options flex-col gap-xs">
          {playlists[0] ? (
            playlists.map(createOptions)
          ) : (
            <p className="txt-md txt-gray">No playlist to show</p>
          )}
        </div>

        <div className="tr-modal-buttons flex-col gap-xs">
          <h2 className="txt-md txt-left">Create new playlist</h2>
          <div className="d-flex gap-xs">
            <div className="tr-input-wrapper flex-1">
              <input
                className="tr-input-item"
                type="text"
                placeholder="Playlist name"
                value={newPlaylistName}
                onChange={updateNewPlaylistName}
              />
            </div>
            <button
              onClick={createPlaylist}
              className="tr-btn tr-icon-label-btn tr-btn-cta"
              aria-label="create new playlist"
            >
              <i className="fa fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
