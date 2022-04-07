import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserResources } from "contexts";
import { setDocumentTitle, resourcesDispatchConstants } from "utilities";
export function Playlists() {
  const pageTitle = "Playlists | Crickstreams";
  setDocumentTitle(pageTitle);
  const {
    userResources: { playlists },
    userResourcesDispatch,
  } = useUserResources();
  const { ADD_NEW_PLAYLIST, REMOVE_PLAYLIST } = resourcesDispatchConstants;
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const createNewPLaylist = () =>
    userResourcesDispatch({
      type: ADD_NEW_PLAYLIST,
      payload: { title: newPlaylistName },
    });

  const removePlaylist = (playlistId) =>
    userResourcesDispatch({ type: REMOVE_PLAYLIST, payload: playlistId });

  const updateNewPlaylistName = (e) => setNewPlaylistName(e.target.value);

  const createPlaylistCard = ({ videos, title, _id }) => {
    const playlistBanner = videos[0]?.thumbnailHigh.url || "";
    const totalVideos = videos.length;
    return (
      <Link
        key={_id}
        to={`/playlists/${_id}`}
        className="playlist-card tr-card pd-0 radius-xs bs-lighter align-s-start bg-secondary bd-none"
      >
        <figure>
          <img
            className="radius-xs h-100"
            src={playlistBanner || "/assets/fallback-image.png"}
            alt={title}
          ></img>
        </figure>
        <div className="pd-sm">
          <h2>{title}</h2>
          <p>{totalVideos} videos</p>
        </div>
        <div class="txt-right">
          <button
            className="bg-transparent bd-none pd-xs"
            onClick={() => removePlaylist(_id)}
          >
            <i className="fas fa-trash txt-error txt-lg"></i>
          </button>
        </div>
      </Link>
    );
  };

  return (
    <main className="txt-center flex-col pd-lg">
      <h1>Playlists</h1>
      <div className="w-100 mr-left-auto" style={{ maxWidth: "20rem" }}>
        <h2 className="txt-md txt-left">Create new Playlist</h2>
        <div class="d-flex gap-xs tr-input-wrapper">
          <input
            type="text"
            value={newPlaylistName}
            onChange={updateNewPlaylistName}
            className="tr-input-item"
            placeholder="Playlist name"
          />
          <button
            onClick={createNewPLaylist}
            aria-label="remove playlist"
            className="tr-btn tr-btn-cta"
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
      {playlists.length ? (
        <div className="d-flex grid-autofit-md gap-md justify-c-center f-wrap">
          {playlists.map(createPlaylistCard)}
        </div>
      ) : (
        <h2>No Playlists to show</h2>
      )}
    </main>
  );
}
