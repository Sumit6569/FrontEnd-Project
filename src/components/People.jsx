import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./Templates/TopNav";
import DropDown from "./Templates/DropDown";
import Axios from "../Utills/Axios";
import Loading from "./Templates/Loading";
import Cards from "./Templates/Cards";
import InfiniteScroll from "react-infinite-scroll-component";

function People() {
    const navigate = useNavigate();

    const [category, setcategory] = useState("popular");

    const [person, setperson] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true);
    document.title = "SCSDB | person " + category.toUpperCase();

    const GetPersondata = async () => {
      try {
        const { data } = await Axios.get(`/person/${category}?page=${page}`);

        if (data.results.length > 0) {
          setperson((prevState) => [...prevState, ...data.results]);
          setpage(page + 1);
        } else {
          sethasMore(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    console.log(person);

    const refresHanderle = () => {
      if (person.length === 0) {
        GetPersondata();
      } else {
        setpage(1);
        setperson([]);
        GetPersondata();
      }
    };

    useEffect(() => { 
      refresHanderle();
    }, [category]);


  return person.length > 0 ? (
    <div className=" w-screen h-screen">
      <div className="px-[5%] w-full flex items-center justify-between ">
        <h1 className="  text-2xl font-semibold  text-zinc-400 ">
          <i
            onClick={() => navigate(-1)}
            className=" hover:text-[#6556CD]  ri-arrow-left-line"
          ></i>
          Actors <small className="ml-2 text-sm text-zinc-600">({category})</small>
        </h1>
        <div className="flex items-center  w-[80%]">
          <TopNav />
          
          <div className="w-[2%]"></div>
        </div>
      </div>
      <InfiniteScroll
        dataLength={person.length}
        next={GetPersondata}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={person} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default People;
