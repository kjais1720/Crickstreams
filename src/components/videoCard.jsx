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
    <article className="tr-card bg-transparent bd-none bs-lighter flex-col align-s-stretch pd-xs">
      <div className="tr-card-banner">
        <img className="w-100" src={imgUrl} alt={title} />
      </div>
      <div className="tr-card-body flex-col gap-sm justify-c-space-between">
        <div className="tr-card-header">
          <h2 className="title p-rel txt-md" data-title={title}>
            <Link to={`/video/${id}`}>{truncateText(title, 30)}</Link>
          </h2>
          <h3 className="subtitle txt-sm">{author}</h3>
        </div>
        <div className="d-flex justify-c-space-between align-i-center gap-sm">
          <button className="tr-btn tr-btn-icon">
            <i className="far fa-thumbs-up"></i>
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
