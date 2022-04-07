import { useUserResources } from "contexts";
import { resourcesDispatchConstants } from "utilities";
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

  const clearHistoryBtn = { name: "Clear all", clickHandler: clearHistory };
  const removeFromHistoryBtn = {
    name: "Remove from History",
    clickHandler: removeFromHistory,
  };
  return (
    <SinglePlaylistPage
      playlistTitle={pageTitle}
      playlistVideos={history}
      playlistActionBtn={clearHistoryBtn}
      deleteItemBtn={removeFromHistoryBtn}
    />
  );
}
