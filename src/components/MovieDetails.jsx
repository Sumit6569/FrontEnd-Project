import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "../store/actions/movieAction";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Templates/Loading";
import HorizontalCard from "./Templates/HorizontalCard";
import "./MovieDetails.css"; // Import the CSS file

function MovieDetails() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [dispatch, id]);

  return info ? (
    <div
      className="movie-details-container"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
      }}
    >
      {/* Navigation */}
      <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-2 sm:gap-4 md:gap-10 text-xs sm:text-sm md:text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={info.detail.homepage}
          className="text-xs sm:text-sm"
        >
          <i className="ri-external-link-fill"></i>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
          className="text-xs sm:text-sm"
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
          className="text-xs sm:text-sm"
        >
          IMDB
        </a>
      </nav>

      {/* Poster and Details */}
      <div className="w-full flex flex-col md:flex-row items-center gap-4 sm:gap-6">
        <img
          className="movie-details-poster sm:w-[60%] md:w-[30%]"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt="Movie Poster"
        />
        <div className="movie-details-content mt-3 md:mt-0 md:ml-[4%]">
          <h1 className="text-xl sm:text-2xl md:text-5xl font-black">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}
            <small className="block text-sm sm:text-lg md:text-2xl font-bold text-zinc-200">
              ({info.detail.release_date.split("-")[0]})
            </small>
          </h1>

          <div className="mt-2 flex flex-wrap gap-x-2 gap-y-2 text-white text-xs sm:text-sm md:text-base">
            <span className="rounded-full text-xs sm:text-sm md:text-xl font-semibold bg-yellow-600 text-white w-[5vh] h-[5vh] flex justify-center items-center">
              {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
            </span>
            <h1 className="font-semibold">User Score</h1>
            <h1>{info.detail.release_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(", ")}</h1>
            <h1>{info.detail.runtime} min</h1>
          </div>

          <h1 className="text-sm md:text-xl font-semibold italic text-zinc-200 mt-2">
            {info.detail.tagline}
          </h1>
          <h1 className="text-sm sm:text-base md:text-xl mt-3">Overview</h1>
          <p className="text-xs sm:text-sm md:text-base">
            {info.detail.overview}
          </p>

          <Link
            className="movie-details-button mt-4"
            to={`${pathname}/trailer`}
          >
            <i className="text-sm sm:text-base md:text-xl ri-play-large-fill mr-2"></i>
            Play Trailer
          </Link>
        </div>
      </div>

      {/* Recommendations */}
      <hr className="mt-5 border-none h-[1px] bg-zinc-500" />
      <h1 className="mt-5 text-lg sm:text-xl md:text-3xl font-bold text-white">
        Recommendation & Similar Stuff
      </h1>
      <div className="bg-[#1F1E24] w-full py-4 mb-19">
        <HorizontalCard
          data={
            info.recomdeations && info.recomdeations.length > 0
              ? info.recomdeations
              : info.similar && info.similar.length > 0
              ? info.similar
              : []
          }
        />
      </div>
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
}

export default MovieDetails;
