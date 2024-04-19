import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./Templates/TopNav";
import DropDown from "./Templates/DropDown";
import Axios from "../Utills/Axios";
import Loading from "./Templates/Loading";
import Cards from "./Templates/Cards";
import InfiniteScroll from "react-infinite-scroll-component";


function PopularSideNav() {
    
  const navigate = useNavigate();

  const [category, setcategory] = useState("movie");

  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
 document.title = "SCSDB | Popular " + category.toUpperCase();

  const GetPopulardata = async () => {
    try {
      const { data } = await Axios.get(
        `${category}/popular?page=${page}`
      );
      
      if (data.results.length > 0) {
        setpopular((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(popular);

  const refresHanderle = () => {
    if (popular.length === 0) {
      GetPopulardata();
    } else {
      setpage(1);
      setpopular([]);
      GetPopulardata();
    }
  };

  useEffect(() => {
    refresHanderle();
  }, [category]);


  return popular.length > 0 ? (
    <div className=" w-screen h-screen">
      <div className="px-[5%] w-full flex items-center justify-between ">
        <h1 className="  text-2xl font-semibold  text-zinc-400 ">
          <i
            onClick={() => navigate(-1)}
            className=" hover:text-[#6556CD]  ri-arrow-left-line"
          ></i>
          Popular
        </h1>
        <div className="flex items-center  w-[80%]">
          <TopNav />
          <DropDown
            title="category"
            options={["tv", "movie"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
          
        </div>
      </div>
      <InfiniteScroll
        dataLength={popular.length}
        next={GetPopulardata}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default PopularSideNav;
