
  

# Crickstreams

  

An Online Video library, built with React and mirageJS as a mock backend.

  ## Live URL
### <https://crickstreams.vercel.app>
  
## Preview

https://user-images.githubusercontent.com/66024105/162269102-df7a7b0b-c4c8-4f48-b332-f3007463d472.mp4

## To run locally

- Clone the project locally using the command :
    - `git clone https://github.com/kjais1720/Crickstreams.git`
- Install the dependencies :
	- `npm install`
- Start the app :
	- `npm run start` or `npm start
  

## Features

### Authentication with Form validation
- User can login/logout using email and password
- User can login using guest credentials
### Home page
- There is a list of categories in the landing page, clicking on any particular category will take the user to the video listing page of that category
### Video Listing page
- On the video card, Users can add the video to liked, watch later or to any playlist  or create a new playlist.
- If the video is already added to any list, user can remove it from that list from video card in video listing page itself
### Single Video Page
- After clicking on the links on the video cards, user is redirected to a single video page which plays that video in an embed
- From the single video page, User can add the video to Liked, Watch later or to any playlist or create a new playlist 
### History
- Whenever user watches any video by clicking on the link, the video is added to their history
- In the history page, user can remove a single video from the history or clear whole history
### Watch later
- User can add any video to watch later and view that video in the watch later page
### Liked Videos
- User can add any video to Liked videos and view that video in the Liked videos page

### Playlists
- User can add any video to an already present playlist or create a new playlist and then add it.
- In the playlist page user is shown a list of all the playlists and an option to create a new playlist.
- On the playlist cards, user is shown a delete button to remove that playlist
- On clicking on any playlist, user is redirected to that playlist's page
- In the single playlist page, the user can remove a video from that playlist or remove the whole playlist
