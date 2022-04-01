import { Link } from "react-router-dom";
import { truncateText } from "utilities";
import { DropDownMenu } from "components";

export function VideoCard({ video }) {
  const {
    _id: id,
    title,
    thumbnailHigh: { url: imgUrl },
    author,
    likes,
    views,
  } = video;
  const dropdownButtons = [
    {
      name: "Add Watch later",
      clickHandler: ()=>{} // To be replaced "Watch later" dispatch
    },
    {
      name: "Add to Playlist",
      clickHandler: ()=>{} // To be replaced "Add to playlist" dispatch

    },
  ];
  return (
    <article class="tr-card light-shadow flex-col align-s-stretch pd-xs">
      <div class="tr-card-banner">
        <img className="w-100" src={imgUrl} alt={title} />
      </div>
      <div class="tr-card-body flex-col gap-sm justify-c-space-between">
        <div class="tr-card-header">
          <h2 class="title txt-md">
            <Link to={`/video/${id}`}>{truncateText(title, 30)}</Link>
          </h2>
          <h3 class="subtitle txt-secondary txt-sm">{author}</h3>
        </div>
        <div class="d-flex justify-c-space-between align-i-center gap-sm">
          <button className="tr-btn tr-btn-icon">
            <i class="far fa-thumbs-up"></i>
          </button>
          <button className="tr-btn tr-btn-icon">
            <i class="far fa-thumbs-down"></i>
          </button>
          <DropDownMenu menuButtons={dropdownButtons} />
        </div>
      </div>
    </article>
  );
}
