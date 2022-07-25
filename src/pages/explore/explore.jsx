import { useVideos } from "contexts";
import { useParams, useNavigate, Link } from "react-router-dom";
import { VideoList } from "components";
import { setDocumentTitle } from "utilities";

export function Explore({ categories }) {
  const { category } = useParams();
  const navigate = useNavigate();
  //To check whether the category found from the url is a valid category or not
  // Also, initially the "categories array would be empty until a response is recieved from the server"
  // So if the user is on a valid category page and tries to reload the page, the categories array would be empty and the statement would be false
  // So they will be redirected to the error page, to handle this, another condition is added which checks if the 'categories' is empty
  // If it is empty then it won't redirect the user to error page and wait for the server response
  categories.some(({ categoryName }) => categoryName === category) ||
    category === undefined ||
    categories.length === 0 ||
    navigate("/not-found");

  const title = `${category ? category : "All"} cricket videos | Crickstreams`;
  setDocumentTitle(title);

  const { videos } = useVideos();

  const filteredVideos =
    category === undefined // If the route is "/explore" i.e category is not defined
      ? videos
      : videos?.filter((video) => video.categoryName === category) || [];

  const getActiveChipStyle = (categoryName) =>
    categoryName === category ||
    (categoryName === "All" && category === undefined)
      ? {
          backgroundColor: "var(--tr-accent-color)",
          color: "var(--tr-primary-color)",
        }
      : {
          backgroundColor: "var(--tr-primary-overlay)",
        };
  const createLinkChip = ({ categoryName, linkPath, _id }) => (
    <Link
      className="pd-xs txt-bold radius-xs bd-1 txt-accent"
      key={_id}
      to={linkPath}
      style={getActiveChipStyle(categoryName)}
    >
      {categoryName}
    </Link>
  );
  return (
    <main className="pd-x-lg">
      <div className="d-flex gap-sm mr-y-lg f-wrap">
        {categories.map(createLinkChip)}
      </div>
      <VideoList videos={filteredVideos} />
    </main>
  );
}
