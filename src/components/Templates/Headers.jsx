import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Headers.css";  // Import the CSS file

function Headers({ data }) {
  const { pathname } = useLocation();
  console.log(data);
  const { title } = useState(data);

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)),url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "top 10%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="poster-container" // Apply the CSS class
    >
      <h1 className="text-5xl font-black text-white mt-10">
        {data.name || data.title || data.original_name || data.original_title}
      </h1>
      <p className="mt-3 text-white">
        {data.overview.slice(0, 200)}...
        <Link
          to={`/${data.media_type}/details/${data.id}`}
          className="text-blue-400"
        >
          More
        </Link>
      </p>
      <p className="text-white">
        <i className="text-yellow-500 ri-megaphone-fill"></i>{" "}
        {data.release_date || "No information"}
        <i className="ml-5 text-yellow-500 ri-album-fill"></i>{" "}
        {data.media_type.toUpperCase()}
      </p>
      <Link
        to={`/${data.media_type}/details/${data.id}/trailer`}
        className="absolute mt-30 bg-[#6556CD] p-4 rounded text-white"
      >
        Watch Trailer
      </Link>
    </div>
  );
}

export default Headers;
