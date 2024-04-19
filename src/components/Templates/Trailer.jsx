import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import NoTfound from "../NoTfound";
function Trailer() {
  const navigate = useNavigate(-1);
  const { pathname } = useLocation();
  const categery = pathname.includes("movie") ? "movie" : "tv";
  const ytvideos = useSelector((state) => state[categery].info.videos);

  return (
    <div className="bg-[rgba(0,0,0,.9)] absolute z-[100] left-[0] top-[0] w-screen h-screen flex items-center justify-center">
      <Link
        onClick={() => navigate(-1)}
        className="absolute hover:text-[#6556CD]  ri-close-fill text-5xl text-white right-[5%] top-[2%] "
      ></Link>
      {ytvideos ? (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${ytvideos.key}`}
          controls={false} // Hide video controls
          playing={true} // Autoplay the video
          width="90%" // Set player width
          height="90%" // Set player height
          style={{
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.5)",
          }} // Apply custom styling
          config={{
            youtube: {
              playerVars: {
                autoplay: 1, // Enable autoplay
                
                quality: "highres",// Set video quality to maximum
                rel: 0, // Disable related videos at the end
              },
            },
          }}
        />
      ) : (
        <NoTfound />
      )}
    </div>
  );

};

export default Trailer;
