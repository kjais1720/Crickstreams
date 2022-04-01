import { useVideos } from "contexts";
import { useParams } from "react-router-dom";
import { VideoCard } from "components";
import { setDocumentTitle } from "utilities";
export function VideoListing() {
  const { category } = useParams();
  const title  = `${category ? category : "All" } cricket videos | Crickstreams`
  setDocumentTitle(title);
  const { videos } = useVideos();
  const filteredVideos =
    category === undefined // If the route is "/explore" i.e category is not defined
      ? videos
      : videos?.filter((video) => video.categoryName === category) || [];

  return (
    <main>
      <h1 className="txt-center mr-y-lg">{category ? category : "All"} videos</h1>
      <div className="d-grid grid-autofit-md justify-i-center gap-sm pd-x-lg">
        {filteredVideos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </main>
  );
}
