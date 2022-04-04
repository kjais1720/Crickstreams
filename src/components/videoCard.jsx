import { Link } from "react-router-dom";
import { truncateText } from "utilities";
import { DropDownMenu } from "components";
import { useUserResources, resourcesApiStateEnums, useAuth } from "contexts";
import { toast } from "react-toastify";

export function VideoCard({ video }) {
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
    resourcesApiDispatch,
    userResources: { likes: likedVideos, watchlater },
  } = useUserResources();
  const {
    ADD_TO_LIKES,
    ADD_TO_WATCHLATER,
    REMOVE_FROM_WATCHLATER,
    REMOVE_FROM_LIKES,
  } = resourcesApiStateEnums;

  const {
    userState: { isLoggedIn },
    setShowAuthModal,
  } = useAuth();

  const isLiked = likedVideos.some((video) => video._id === id);
  const isAddedToWatchlater = watchlater.some((video) => video._id === id);

  const authMiddleware = (functionToExecute) => {
    if (isLoggedIn) {
      functionToExecute();
    } else {
      setShowAuthModal(true);
      toast.error("You need to login first!");
    }
  };

  const addToLikesHandler = () =>
    isLiked
      ? resourcesApiDispatch({ type: REMOVE_FROM_LIKES, payload: id })
      : resourcesApiDispatch({ type: ADD_TO_LIKES, payload: video });

  const addToWatchlaterHandler = () =>
    isAddedToWatchlater
      ? resourcesApiDispatch({ type: REMOVE_FROM_WATCHLATER, payload: id })
      : resourcesApiDispatch({ type: ADD_TO_WATCHLATER, payload: video });

  const dropdownButtons = [
    {
      name: isAddedToWatchlater ? "Remove from Watch later" : "Add Watch later",
      clickHandler: () => {authMiddleware(addToWatchlaterHandler)},
      icon: "clock",
    },
    {
      name: "Add to Playlist",
      clickHandler: () => {}, // To be replaced "Add to playlist" dispatch
      icon: "list",
    },
  ];
  return (
    <article className="tr-card bg-transparent bd-none bs-lighter flex-col align-s-stretch pd-xs">
      <div className="tr-card-banner">
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
      </div>
      <div className="tr-card-body flex-col gap-sm justify-c-space-between">
        <div className="tr-card-header flex-col gap-xs">
          <h2 className="title p-rel txt-md" data-title={title}>
            <Link to={`/video/${id}`}>{truncateText(title, 30)}</Link>
          </h2>
          <h3 className="subtitle txt-sm">{author}</h3>
          <h3 className="subtitle txt-sm">{views} views</h3>
        </div>
        <div className="d-flex justify-c-space-between align-i-center gap-sm">
          <button
            onClick={() => authMiddleware(addToLikesHandler)}
            className="tr-btn tr-btn-icon"
          >
            <i className={`${isLiked ? "fas" : "far"} fa-thumbs-up`}></i>
          </button>
          <button className="tr-btn tr-btn-icon">
            <i className="far fa-thumbs-down"></i>
          </button>
          <DropDownMenu menuButtons={dropdownButtons} />
        </div>
      </div>
    </article>
  );
}
