import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./Templates/TopNav";
import DropDown from "./Templates/DropDown";
import Axios from "../Utills/Axios";
import Loading from "./Templates/Loading";
import Cards from "./Templates/Cards";
import InfiniteScroll from "react-infinite-scroll-component";

function MovieSideNav() {
  const navigate = useNavigate();

  const [category, setcategory] = useState("now_playing");

  const [movie, setmovie] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "SCSDB | movie " + category.toUpperCase();

  const GetMoviedata = async () => {
    try {
      const { data } = await Axios.get(`/movie/now_playing?page=${page}`);

      if (data.results.length > 0) {
        setmovie((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(movie);

  const refresHanderle = () => {
    if (movie.length === 0) {
      GetMoviedata();
    } else {
      setpage(1);
      setmovie([]);
      GetMoviedata();
    }
  };

  useEffect(() => {
    refresHanderle();
  }, [category]);

  return movie.length > 0 ? (
    <div className=" w-screen h-screen">
      <div className="px-[5%] w-full flex items-center justify-between ">
        <h1 className="  text-2xl font-semibold  text-zinc-400 ">
          <i
            onClick={() => navigate(-1)}
            className=" hover:text-[#6556CD]  ri-arrow-left-line"
          ></i>
          Movie <small className="ml-2 text-sm text-zinc-600">({category})</small>
        </h1>
        <div className="flex items-center  w-[80%]">
          <TopNav />
          <DropDown
            title="category"
            options={["popular", "top_rated", "upcoming", "now_playing"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
        </div>
      </div>
      <InfiniteScroll
        dataLength={movie.length}
        next={GetMoviedata}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={movie} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default MovieSideNav;
