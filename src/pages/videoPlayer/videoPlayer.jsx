import { useState } from "react";
import { useParams } from "react-router";
import YouTube from "react-youtube";

import { useVideos, useUserResources, resourcesApiStateEnums } from "contexts";
import { LoaderForComponent } from "components";
import { useEffect } from "react";

export function VideoPlayer() {
  const { id } = useParams();
  const { videos, isLoading } = useVideos();
  const [currentVideo, setCurrentVideo] = useState({});
  const { resourcesApiDispatch } = useUserResources();
  const { ADD_TO_HISTORY } = resourcesApiStateEnums;
  useEffect(() => {
    const foundVideo = videos.find((video) => video._id === id);
    if (foundVideo) {
      setCurrentVideo({ ...foundVideo });
      resourcesApiDispatch({ type: ADD_TO_HISTORY, payload: foundVideo });
    }
  }, [videos, isLoading]);

  const { title, description, thumbnailHigh, author, likes, views, videoId } =
    currentVideo;

  const opts = {
    height: "390",
    width: "1020",
    playerVars: {
      autoplay: 0,
    },
  };

  return isLoading ? (
    <LoaderForComponent />
  ) : (
    <main className="video-player-page pd-md d-grid gap-sm">
      <div className="video-player">
        <YouTube opts={opts} videoId={videoId} />
        <div className="video-details flex-col gap-xs">
          <h2 className="txt-md">{title}</h2>
          <div class="d-flex w-100 justify-c-space-between f-wrap">
            <h3 className='txt-gray'>{views} views</h3>
            <div className="d-flex gap-sm">
              <button className="pd-xs radius-xs bg-primary bd-none txt-white txt-md d-flex gap-xs align-i-center">
                <i className={`far fa-thumbs-up`}></i>
                Like
              </button>
              <button className="pd-xs radius-xs bg-primary bd-none txt-white txt-md d-flex gap-xs align-i-center">
                <i className={`far fa-clock`}></i>
                Watchlater
              </button>
              <button className="pd-xs radius-xs bg-primary bd-none txt-white txt-md d-flex gap-xs align-i-center">
                <i className={`far fa-list`}></i>
                Add to Playlist
              </button>
            </div>
          </div>
          <p className="txt-gray">{description}</p>
        </div>
      </div>
      <form className="notes flex-1 pd-sm radius-xs w-50 flex-col">
        <h2>Notes</h2>
        <div class="tr-input-wrapper">
          <input className="tr-input-item" placeholder="Title" type="text" />
        </div>
        <div class="tr-input-wrapper">
          <textarea
            class="tr-input-item"
            cols="30"
            rows="5"
            placeholder="Description"
          ></textarea>
        </div>
        <button className="tr-btn tr-btn-cta"> Add note</button>
      </form>
    </main>
  );
}
