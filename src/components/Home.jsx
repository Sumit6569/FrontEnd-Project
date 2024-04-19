import React, { useState, useEffect } from "react";
import SideBar from "./Templates/SideBar";
import TopNav from "./Templates/TopNav";
import Axios from "../Utills/Axios";
import Headers from "./Templates/Headers";
import HorizontalCard from "./Templates/HorizontalCard";
import DropDown from "./Templates/DropDown";
import Loading from "./Templates/Loading";

function Home() {
  document.title = "SCSDB | Homepage ";
  const [walllpaper, setwalllpaper] = useState(null);
  const [trending, setTrending] = useState(null);

  const [category, setcatogory] = useState("all");
  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await Axios.get(`/trending/all/day`);

      let randomdata =
        data.results[(Math.random() * data.results.length).toFixed()];
      setwalllpaper(randomdata);
    } catch (err) {
      console.log(err);
    }
  };

  const GetTrendingdata = async () => {
    try {
      const { data } = await Axios.get(`/trending/${category}/day`);
      setTrending(data.results);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    GetTrendingdata();
    !walllpaper && GetHeaderWallpaper();
  }, [category]);

  return walllpaper && trending ? (
    <>
      <SideBar />
      <div className="w-[80%] h-full  overflow-auto overflow-x-hidden">
        <TopNav />
        <Headers data={walllpaper} />
        <div className="flex justify-between  p-5">
          <h1 className="text-3xl font-semibold text-zinc-400">Trending</h1>
          <DropDown
            title="filter"
            options={["tv", "movie", "all"]}
            func={(e) => setcatogory(e.target.value)}
          />
        </div>

        <HorizontalCard data={trending} />
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Home;
