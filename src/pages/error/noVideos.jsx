import {Link} from "react-router-dom";
export function NoVideosToShow(){
  return(
    <main className="min-height-100 flex-center">
      <div class="flex-col align-i-center txt-center">
        <h1>There are no videos to show</h1>
        <Link to="/explore" className="tr-btn tr-btn-primary"> Start streaming  </Link>
      </div>
    </main> 
  )
}