//Resource API state Enums
export const resourcesApiStateEnums = {
  GET_ALL_PLAYLISTS: "GET_ALL_PLAYLISTS",
  ADD_NEW_PLAYLIST: "ADD_NEW_PLAYLIST",
  REMOVE_PLAYLIST: "REMOVE_PLAYLIST",
  GET_A_PLAYLIST: "GET_A_PLAYLIST",
  ADD_TO_PLAYLIST: "ADD_TO_PLAYLIST",
  REMOVE_FROM_PLAYLIST: "REMOVE_FROM_PLAYLIST",
  ADD_TO_HISTORY: "ADD_TO_HISTORY",
  REMOVE_FROM_HISTORY: "REMOVE_FROM_HISTORY",
  CLEAR_HISTORY: "CLEAR_HISTORY",
  ADD_TO_LIKES: "ADD_TO_LIKES",
  REMOVE_FROM_LIKES: "REMOVE_FROM_LIKES",
  ADD_TO_WATCHLATER: "ADD_TO_WATCHLATER",
  REMOVE_FROM_WATCHLATER: "REMOVE_FROM_WATCHLATER",
};

const {
  ADD_NEW_PLAYLIST,
  REMOVE_PLAYLIST,
  GET_A_PLAYLIST,
  ADD_TO_PLAYLIST,
  REMOVE_FROM_PLAYLIST,
  ADD_TO_HISTORY,
  REMOVE_FROM_HISTORY,
  CLEAR_HISTORY,
  ADD_TO_LIKES,
  REMOVE_FROM_LIKES,
  ADD_TO_WATCHLATER,
  REMOVE_FROM_WATCHLATER,
} = resourcesApiStateEnums;

export const apiReducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_NEW_PLAYLIST:
      return {
        ...state,
        url: "/api/user/playlists",
        method: "post",
        data: { playlist: payload },
        toastMessage: "New Playlist created",
        toastType: "success",
      };
    case REMOVE_PLAYLIST:
      return {
        ...state,
        url: `/api/user/playlists/${payload}`,
        method: "delete",
        data: {},
        toastMessage: "Playlist removed",
        toastType: "success",
      };
    case GET_A_PLAYLIST:
      return {
        ...state,
        url: `/api/user/playlists/${payload}`,
        method: "get",
        data: {},
      };
    case ADD_TO_PLAYLIST:
      return {
        ...state,
        url: `/api/user/playlists/${payload.playlistId}`,
        method: "post",
        data: { video: payload.video },
        toastMessage: "Added to playlist",
        toastType: "success",
      };
    case REMOVE_FROM_PLAYLIST:
      return {
        ...state,
        url: `/api/user/playlists/${payload}`,
        method: "delete",
        data: {},
        toastMessage: "Removed from playlist",
        toastType: "success",
      };
    case ADD_TO_HISTORY:
      return {
        ...state,
        url: `/api/user/history`,
        method: "post",
        data: { video: payload },
      };
    case REMOVE_FROM_HISTORY:
      return {
        ...state,
        url: `/api/user/history/${payload}`,
        method: "delete",
        data: {},
      };
    case CLEAR_HISTORY:
      return {
        ...state,
        url: `/api/user/history/all`,
        method: "delete",
        data: {},
      };
    case ADD_TO_LIKES:
      return {
        ...state,
        url: `/api/user/likes`,
        method: "post",
        data: { video: payload },
        toastMessage: "Video added to likes",
        toastType: "success",
      };
    case REMOVE_FROM_LIKES:
      return {
        ...state,
        url: `/api/user/likes/${payload}`,
        method: "delete",
        data: {},
        toastMessage: "Video removed from likes",
        toastType: "success",
      };
    case ADD_TO_WATCHLATER:
      return {
        ...state,
        url: `/api/user/watchlater`,
        method: "post",
        data: { video: payload },
        toastMessage: "Added to watch later",
        toastType: "success",
      };
    case REMOVE_FROM_WATCHLATER:
      return {
        ...state,
        url: `/api/user/watchlater/${payload}`,
        method: "delete",
        data: {},
        toastMessage: "Video removed from watch later",
        toastType: "success",
      };
    case "CLEAR_TOAST":
      return {
        ...state,
        toastMessage: "",
      };
    default:
      return state;
  }
};

//User Resource state Enums
export const userResourceStateEnums = {
  UPDATE_PLAYLISTS: "UPDATE_PLAYLISTS",
  UPDATE_HISTORY: "UPDATE_HISTORY",
  UPDATE_LIKED: "UPDATE_LIKED",
  UPDATE_WATCHLATER: "UPDATE_WATCHLATER",
};
