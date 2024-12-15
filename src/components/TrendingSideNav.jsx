import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./Templates/TopNav";
import DropDown from "./Templates/DropDown";
import Axios from "../Utills/Axios";

import Loading from "./Templates/Loading";
import Cards from "./Templates/Cards";
import InfiniteScroll from "react-infinite-scroll-component";
import "./TrendingSideNav";
function TrendingSideNav() {
  const navigate = useNavigate();

  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [Trending, setTrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "SCSDB | Trending " + category.toUpperCase();

  const GetTrendingdata = async () => {
    try {
      const { data } = await Axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );
      setTrending((prevState) => [...prevState, ...data.results]);
      if (data.results.length > 0) {
        setTrending((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(Trending);

  const refresHanderle = () => {
    if (Trending.length === 0) {
      GetTrendingdata();
    } else {
      setpage(1);
      setTrending([]);
      GetTrendingdata();
    }
  };

  useEffect(() => {
    refresHanderle();
  }, [category, duration]);

  return Trending.length > 0 ? (
    <div className="trending-container w-screen h-screen">
      <div className="px-[5%] w-full flex items-center justify-between ">
        <h1 className="text-2xl font-semibold text-zinc-400 ">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line"
          ></i>
          Trending
          <small className="ml-2 text-sm text-zinc-600">({category})</small>
        </h1>
        <div className="flex items-center w-[80%]">
          <TopNav />
          <DropDown
            title="category"
            options={["movie", "all"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
          <DropDown
            title="duration"
            options={["week", "day"]}
            func={(e) => setduration(e.target.value)}
          />
        </div>
      </div>
      <InfiniteScroll
        dataLength={Trending.length}
        next={GetTrendingdata}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <div className="card-container">
          <Cards data={Trending} title={category} />
        </div>
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default TrendingSideNav;
