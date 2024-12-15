import Axios from "../../Utills/Axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimg from "/noimg.jpg";

function TopNav() {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);

  const GetSearches = async () => {
    try {
      const { data } = await Axios.get(`/search/multi?query=${query}`);
      setsearches(data.results);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (query) {
      GetSearches();
    }
  }, [query]);

  return (
    <div className="w-full md:w-[80%] h-[10vh] relative flex mx-auto items-center px-4 md:px-0">
      <i className="mt-2 text-zinc-400 text-3xl ri-search-line"></i>
      <input
        onChange={(e) => setquery(e.target.value)}
        value={query}
        className="w-[70%] md:w-[50%] text-zinc-200 mx-4 p-2 md:p-5 text-lg md:text-xl outline-none border-none bg-transparent"
        type="text"
        placeholder="Search anything"
      />
      {query.length > 0 && (
        <i
          onClick={() => setquery("")}
          className="text-zinc-400 text-3xl ri-close-fill cursor-pointer"
        ></i>
      )}

      {query.length > 0 && searches.length > 0 && (
        <div className="z-[100] absolute w-[85%] md:w-[50%] max-h-[40vh] bg-zinc-200 top-[110%] left-[7.5%] md:left-[25%] overflow-auto rounded shadow-lg">
          {searches.map((s, i) => (
            <Link
              to={`/${s.media_type}/details/${s.id}`}
              key={i}
              className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-full p-4 flex justify-start items-center border-b border-zinc-100"
            >
              <img
                className="w-[8vh] h-[8vh] object-cover rounded mr-4 shadow-md"
                src={
                  s.backdrop_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        s.backdrop_path || s.profile_path
                      }`
                    : noimg
                }
                alt=""
              />
              <span className="truncate">{s.name || s.title || s.original_name || s.original_title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default TopNav;
