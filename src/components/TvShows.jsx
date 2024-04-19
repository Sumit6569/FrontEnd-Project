import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./Templates/TopNav";
import DropDown from "./Templates/DropDown";
import Axios from "../Utills/Axios";
import Loading from "./Templates/Loading";
import Cards from "./Templates/Cards";
import InfiniteScroll from "react-infinite-scroll-component";


function TvShows() {


const navigate = useNavigate();

  const [category, setcategory] = useState("airing_today");

  const [tv, settv] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "SCSDB | tv " + category.toUpperCase();

  const GetTvdata = async () => {
    try {
      const { data } = await Axios.get(`/tv/${category}?page=${page}`);

      if (data.results.length > 0) {
        settv((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(tv);

  const refresHanderle = () => {
    if (tv.length === 0) {
      GetTvdata();
    } else {
      setpage(1);
      settv([]);
      GetTvdata();
    }
  };

  useEffect(() => {
    refresHanderle();
  }, [category]);





  return tv.length > 0 ? (
    <div className=" w-screen h-screen">
      <div className="px-[5%] w-full flex items-center justify-between ">
        <h1 className="  text-2xl font-semibold  text-zinc-400 ">
          <i
            onClick={() => navigate(-1)}
            className=" hover:text-[#6556CD]  ri-arrow-left-line"
          ></i>   
          Tv Shows{" "}
          <small className="ml-2 text-sm text-zinc-600">({category})</small>
        </h1>
        <div className="flex items-center  w-[80%]">
          <TopNav />
          <DropDown
            title="category"
            options={["popular", "top_rated", "on_the_air", "airing_today"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
        </div>
      </div>
      <InfiniteScroll
        dataLength={tv.length}
        next={GetTvdata}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={tv} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default TvShows
