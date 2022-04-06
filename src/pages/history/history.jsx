import { useUserResources, resourcesDispatchConstants } from "contexts";
import { SinglePlaylistPage } from "components";

export function History() {
  const pageTitle = "History";
  const {
    userResources: { history },
    userResourcesDispatch,
  } = useUserResources();
  const { REMOVE_FROM_HISTORY, CLEAR_HISTORY } = resourcesDispatchConstants;

  const removeFromHistory = (id) =>
    userResourcesDispatch({ type: REMOVE_FROM_HISTORY, payload: id });
  const clearHistory = () => userResourcesDispatch({ type: CLEAR_HISTORY });

  const clearHistoryBtn = { clickHandler: clearHistory };
  const removeFromHistoryBtn = { clickHandler: removeFromHistory };
  return (
    <SinglePlaylistPage
      playlistTitle={pageTitle}
      playlistVideos={history}
      clearHistoryBtn={clearHistoryBtn}
      deleteItemBtn={removeFromHistoryBtn}
    />
  );
}
