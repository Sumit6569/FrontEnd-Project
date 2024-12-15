import React from "react";
import DropDown from "./DropDown";
import { Link } from "react-router-dom";
import "./HorizontalCard.css";  // Import the CSS

function HorizontalCard({ data }) {
  return (
    <div className="horizontal-card-container">
      {data.map((d, i) => (
        <Link to={`/${d.media_type}/details/${d.id}`} key={i} className="horizontal-card">
          <img
            className="w-full h-[55%] object-cover"
            src={`https://image.tmdb.org/t/p/original${d.backdrop_path || d.poster_path}`}
            alt={d.title}
          />
          <div className="text-content">
            <h1>{d.name || d.title || d.original_name || d.original_title}</h1>
            <p>
              {d.overview.slice(0, 50)}...
              <span className="text-zinc-500">more</span>
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default HorizontalCard;
