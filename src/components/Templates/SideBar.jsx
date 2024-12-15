import React from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";

function SideBar() {
  return (
    <div className="sidebar w-[20%] h-full border-r-2 border-zinc-400 p-10">
      <h1 className="text-2xl text-white font-bold">
        <i className="text-[#6556CD] ri-tv-fill mr-3"></i>
       
         <span className="link-text   text-2xl ">SCSDB</span>
      </h1>
      <nav className="mainnav flex flex-col text-zinc-400 text-xl gap-3">
        <span className="link-text">
        <h1 className="text-white font-semibold text-xl mt-10 mb-5">New Feeds</h1>
          </span>
        <Link
          to="/trending"
          className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5"
        >
          <i className="mr-2 ri-fire-fill"></i>
          <span className="link-text">Trending</span>
        </Link>
        <Link
          to="/Popular"
          className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5"
        >
          <i className="mr-2 ri-bard-fill"></i>
          <span className="link-text">Popular</span>
        </Link>
        <Link
          to="/movie"
          className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5"
        >
          <i className="mr-2 ri-movie-2-fill"></i>
          <span className="link-text">Movies</span>
        </Link>
        <Link
          to="/tv"
          className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5"
        >
          <i className="mr-2 ri-tv-2-fill"></i>
          <span className="link-text">TV Shows</span>
        </Link>
        <Link
          to="/person"
          className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5"
        >
          <i className="mr-2 ri-team-fill"></i>
          <span className="link-text">People</span>
        </Link>
      </nav>
      <hr className="border-none h-[1px] bg-zinc-400" />
      <nav className="flex flex-col text-zinc-400 text-xl gap-3">
        <h1 className="text-white font-semibold text-xl mt-2 mb-4">
           <span className="link-text"> Website Information</span> 
        </h1>
        <Link className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5">
          <i className="mr-2 ri-information-2-fill"></i>
          <span className="link-text">About SCSDB</span>
        </Link>
        <Link className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5">
          <i className="mr-2 ri-phone-fill"></i>
          <span className="link-text">Contact Us</span>
        </Link>
      </nav>
    </div>
  );
}

export default SideBar;
