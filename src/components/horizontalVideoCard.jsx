import { Link } from "react-router-dom";
import { DropDownMenu } from "components";
import {
  useUserResources,
  useAuth,
} from "contexts";
import { truncateText, isItemInList, resourcesDispatchConstants } from "utilities";
import { toast } from "react-toastify";

export function HorizontalVideoCard({
  video,
  setPlaylistModalState,
  deleteButton,
}) {
  const {
    _id: id,
    title,
    thumbnailHigh: { url: imgUrl },
    author,
  } = video;
  const {
    userResourcesDispatch,
    userResources: { likes: likedVideos, watchlater },
  } = useUserResources();
  const {
    ADD_TO_LIKES,
    ADD_TO_WATCHLATER,
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
      : userResourcesDispatch({ type: ADD_TO_WATCHLATER, payload: video });

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
    <article
      className="horizontal-card d-grid bg-secondary bs-lighter radius-xs"
    >
      <figure>
        <Link to={`/video/${id}`}>
          <img className="radius-xs h-100" src={imgUrl} alt={title}></img>

        </Link>
      </figure>
      <div className="card-body flex-col pd-xs gap-xs">
        <h2 className="card-title p-rel txt-md" data-title={title}>
          <Link to={`/video/${id}`}>{truncateText(title,50)}</Link>
        </h2>
        <h3 className="txt-sm txt-gray">{author}</h3>
        <div className="d-flex gap-md mr-top-auto">
          <DropDownMenu menuButtons={dropdownButtons} />
          {deleteButton ? (
            <button
              className="tr-btn tr-btn-icon"
              onClick={() => deleteButton.clickHandler(id)}
              aria-label={deleteButton.name}
            >
              <i className="far fa-trash txt-error"></i>
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </article>
  );
}
