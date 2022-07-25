import { useMemo, useState } from "react";
import { useParams } from "react-router";
import YouTube from "react-youtube";
import { PlaylistModal, LoaderForComponent } from "components";
import { useAuth, useVideos, useUserResources } from "contexts";
import { resourcesDispatchConstants } from "utilities";
import { useEffect } from "react";
import { VideoList } from "components/videoList";

export function VideoPlayer() {
  const { id: currentVideoId } = useParams();
  const { videos, isLoading } = useVideos();
  const [currentVideo, setCurrentVideo] = useState({});
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const {
    userResourcesDispatch,
    userResources: { likes: likedVideos, watchlater },
  } = useUserResources();
  const {
    ADD_TO_LIKES,
    ADD_TO_WATCH_LATER,
    REMOVE_FROM_WATCH_LATER,
    REMOVE_FROM_LIKES,
    ADD_TO_HISTORY,
  } = resourcesDispatchConstants;

  const {
    userState: { isLoggedIn },
    setShowAuthModal,
  } = useAuth();

  useEffect(() => {
    const foundVideo = videos.find((video) => video._id === currentVideoId);
    if (foundVideo) {
      setCurrentVideo({ ...foundVideo });
      userResourcesDispatch({ type: ADD_TO_HISTORY, payload: foundVideo });
    }
  }, [videos, isLoading]);

  const isLiked = likedVideos.some((video) => video._id === currentVideoId);
  const isAddedToWatchlater = watchlater.some((video) => video._id === currentVideoId);

  const checkAuth = (functionToExecute) => {
    if (isLoggedIn) {
      functionToExecute();
    } else {
      setShowAuthModal(true);
      toast.error("You need to login first!");
    }
  };

  const addToLikes = () =>
    isLiked
      ? userResourcesDispatch({ type: REMOVE_FROM_LIKES, payload: id })
      : userResourcesDispatch({ type: ADD_TO_LIKES, payload: currentVideo });

  const addToWatchlater = () =>
    isAddedToWatchlater
      ? userResourcesDispatch({ type: REMOVE_FROM_WATCH_LATER, payload: id })
      : userResourcesDispatch({
          type: ADD_TO_WATCH_LATER,
          payload: currentVideo,
        });

  const openPlaylistModal = () => setShowPlaylistModal(true);

  const closePlaylistModal = () => setShowPlaylistModal(false);

  const {
    title,
    description,
    views,
    videoId,
    category: currentVideoCategory,
  } = currentVideo;

  const opts = {
    height: "390",
    width: "1020",
    playerVars: {
      autoplay: 0,
    },
  };
  const relatedVideos = useMemo(
    () =>
      videos.filter(
        ({ _id, category }) =>
          category === currentVideoCategory && _id !== currentVideoId
      ),
    [currentVideo]
  );

  return isLoading ? (
    <LoaderForComponent />
  ) : (
    <main className="video-player-page pd-md d-grid gap-sm">
      <div className="video-player">
        <YouTube opts={opts} videoId={videoId} />
        <div className="video-details flex-col gap-xs">
          <h2 className="txt-md">{title}</h2>
          <div className="d-flex w-100 justify-c-space-between f-wrap">
            <h3 className="txt-gray">{views} views</h3>
            <div className="d-flex gap-sm">
              <button
                className={`pd-xs radius-xs ${
                  isLiked ? "bg-accent" : "bg-primary"
                } bd-none txt-white txt-md d-flex gap-xs align-i-center`}
                onClick={() => checkAuth(addToLikes)}
              >
                <i className={`far fa-thumbs-up`}></i>
                Like
              </button>
              <button
                className={`pd-xs radius-xs ${
                  isAddedToWatchlater ? "bg-accent" : "bg-primary"
                } bd-none txt-white txt-md d-flex gap-xs align-i-center`}
                onClick={() => checkAuth(addToWatchlater)}
              >
                <i className={`far fa-clock`}></i>
                Watchlater
              </button>
              <button
                className={`pd-xs radius-xs bg-primary bd-none txt-white txt-md d-flex gap-xs align-i-center`}
                onClick={() => checkAuth(openPlaylistModal)}
              >
                <i className={`far fa-list`}></i>
                Playlist
              </button>
            </div>
          </div>
          <p className="txt-gray">{description}</p>
        </div>
      </div>
      <div className="pd-x-sm" style={{maxHeight:"100vh", overflowY:"auto"}}>
        <h2 className="txt-center">Related Videos</h2>
        <VideoList videos={relatedVideos} />
      </div>
      {showPlaylistModal ? (
        <PlaylistModal
          selectedVideo={currentVideo}
          closePlaylistModal={closePlaylistModal}
        />
      ) : (
        ""
      )}
    </main>
  );
}
