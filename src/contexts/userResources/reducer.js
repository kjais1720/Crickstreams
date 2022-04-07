import {resourcesDispatchConstants } from "utilities";

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
  ADD_TO_WATCH_LATER,
  REMOVE_FROM_WATCH_LATER,
} = resourcesDispatchConstants;

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
    case ADD_TO_WATCH_LATER:
      return {
        ...state,
        url: `/api/user/watchlater`,
        method: "post",
        data: { video: payload },
        toastMessage: "Added to watch later",
        toastType: "success",
      };
    case REMOVE_FROM_WATCH_LATER:
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
  UPDATE_WATCH_LATER: "UPDATE_WATCH_LATER",
};
