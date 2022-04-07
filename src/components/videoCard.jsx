import { Link } from "react-router-dom";
import { truncateText, isItemInList, resourcesDispatchConstants } from "utilities";
import { DropDownMenu } from "components";
import {
  useUserResources,
  useAuth,
} from "contexts";
import { toast } from "react-toastify";

export function VideoCard({ video, setPlaylistModalState }) {
  const {
    _id: id,
    title,
    thumbnailHigh: { url: imgUrl },
    author,
    likes,
    views,
    videoId,
  } = video;
  const {
    userResourcesDispatch,
    userResources: { likes: likedVideos, watchlater },
  } = useUserResources();
  const {
    ADD_TO_LIKES,
    ADD_TO_WATCH_LATER,
    REMOVE_FROM_WATCH_LATER,
    REMOVE_FROM_LIKES,
  } = resourcesDispatchConstants;

  const {
    userState: { isLoggedIn },
    setShowAuthModal,
  } = useAuth();

  const isLiked = isItemInList(likedVideos, id);
  const isAddedToWatchlater = isItemInList(watchlater, id);

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
      : userResourcesDispatch({ type: ADD_TO_LIKES, payload: video });

  const addToWatchlater = () =>
    isAddedToWatchlater
      ? userResourcesDispatch({ type: REMOVE_FROM_WATCH_LATER, payload: id })
      : userResourcesDispatch({ type: ADD_TO_WATCH_LATER, payload: video });

  const openPlaylistModal = () => {
    setPlaylistModalState({
      show: true,
      selectedVideo: video,
    });
  };

  const dropdownButtons = [
    {
      name: isAddedToWatchlater ? "Remove from Watch later" : "Add Watch later",
      clickHandler: () => {
        checkAuth(addToWatchlater);
      },
      icon: "clock",
    },
    {
      name: "Add to Playlist",
      clickHandler: () => {
        checkAuth(openPlaylistModal);
      },
      icon: "list",
    },
    {
      name: isLiked ? "Remove from Likes" : "Add to Likes",
      clickHandler: () => {
        checkAuth(addToLikes);
      },
      icon: "thumbs-up",
    },
  ];
  return (
    <article className="tr-card bg-transparent bd-none bs-lighter flex-col align-s-stretch pd-xs">
      <Link to={`/video/${id}`} className="tr-card-banner">
        <img
          className="w-100"
          src={imgUrl}
          alt={title}
          onError={({ currentTarget }) => {
            // Fallback image if the image link breaks in future
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = `/assets/fallback-image.png`;
          }}
        />
      </Link>
      <div className="tr-card-body flex-col gap-xs justify-c-space-between">
        <h2 className="card-title p-rel txt-md" data-title={title}>
          <Link to={`/video/${id}`}>{truncateText(title, 30)}</Link>
        </h2>
        <div className="d-flex justify-c-space-between align-i-center gap-sm">
          <div>
            <h3 className="subtitle txt-sm">{author}</h3>
            <h3 className="subtitle txt-sm">{views} views</h3>
          </div>
          <DropDownMenu menuButtons={dropdownButtons} />
        </div>
      </div>
    </article>
  );
}
