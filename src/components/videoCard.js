import React from "react";
import VideoPlayer from "./videoPlayer";
import { Link } from "react-router-dom";

// VideoCard renders a single video passed via the `info` prop.
const VideoCard = ({ info }) => {
  if (!info) return null;

  const id = info.id?.videoId || info.id;

  return (
    <Link to={`/watch/${id}`} className="block" state={{info}}>
      <VideoPlayer info={info} />
    </Link>
  );
};

export default VideoCard;