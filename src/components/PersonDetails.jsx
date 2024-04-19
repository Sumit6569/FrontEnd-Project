import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "../store/actions/personAction";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Templates/Loading";
import HorizontalCard from "./Templates/HorizontalCard";
import DropDown from "./Templates/DropDown";
function PersonDetails() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.people);
  const dispatch = useDispatch();
  const [category, setcatogory] = useState("movie");
  console.log(info);

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [dispatch, id]);

  return info ? (
    <div className="px-[8%] w-screen  h-[160vh] bg-[#1F1E24] ">
      <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-xl ">
        <Link
          onClick={() => navigate(-1)}
          className=" hover:text-[#6556CD]  ri-arrow-left-line"
        ></Link>
      </nav>

      <div className="w-full flex ">
        {/* Part 2 left poster and Details*/}

        <div className=" w-[20%]">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[35vh] object-cover"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt=""
          />
          <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />

          {/* Social MEdia Link */}
          <div className="text-2xl text-white flex gap-x-10">
            <a
              target="_black"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className=" ri-earth-fill"></i>
            </a>
            <a
              target="_black"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i className=" ri-facebook-circle-fill"></i>
            </a>

            <a
              target="_black"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i className=" ri-instagram-fill"></i>
            </a>

            <a
              target="_black"
              href={`https://twitter.com/${info.externalid.twitter_id}`}
            >
              <i className=" ri-twitter-x-fill"></i>
            </a>
          </div>
          {/* Personla information */}

          <h1 className="text-2xl text-zinc-400 font-semibold my-5">
            Personal Info
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold my-5">
            Known For
          </h1>
          <h1 className="text-lg text-zinc-400 ">
            {info.detail.known_for_department}
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold my-5 mt-3">
            Gender
          </h1>
          <h1 className="text-lg text-zinc-400 ">
            {info.detail.gender === 2 ? "Male" : "Female"}
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold my-5 mt-3">
            Birthday
          </h1>
          <h1 className="text-lg text-zinc-400 ">{info.detail.birthday}</h1>

          <h1 className="text-lg text-zinc-400 font-semibold my-5 mt-3">
            Also Know As
          </h1>
          <h1 className="text-lg text-zinc-400 ">
            {info.detail.also_known_as}
          </h1>
        </div>

        {/* Part 3 RIgnt Details AND Information */}
        <div className="w-[80%] ml-[5%]">
          <h1 className="text-6xl text-zinc-400 font-black my-5">
            {info.detail.name}
          </h1>

          <h1 className="text-xl text-zinc-400 font-semibold my-5">Bioraphy</h1>
          <p className="mt-3 text-zinc-400">{info.detail.biography}</p>
          <h1 className=" mt-5 text-lg text-zinc-400 font-semibold my-5">
            Known For
          </h1>

          <HorizontalCard data={info.combinedCridts.cast} />

          <div className="w-full flex justify-between ">
            <h1 className=" mt-5 text-xl text-zinc-400 font-semibold my-5">
              Acting
            </h1>

            <DropDown
              title={category}
              options={["tv", "movie"]}
              func={(e) => setcatogory(e.target.value)}
            />
          </div>

          <div className="list-disc text-zinc-400 w-full h-[50vh] overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255,255,255,.3)] border-2 border-zinc-700 p-5">
            {category === "tv"
              ? info.tvCredits.cast.map((c, i) => (
                  <li
                    className="hover:text-white duration-300 cursor-pointer"
                    key={i}
                  >
                    <Link className="">
                      <span>
                        <h1 className="text-10xl font-black">
                          {c.name ||
                            c.title ||
                            c.original_name ||
                            c.original_title}
                          
                        </h1>
                      </span>
                      <span className="block">Character Name</span>
                    </Link>
                  </li>
                ))
              : info.movieCredits.data.cast.map((c, i) => (
                  <li
                    className="hover:text-white p-5 rounded hover:bg-[#19191d] duration-300 cursor-pointer"
                    key={i}
                  >
                    <Link
                      to={`/${category}/details/${c.id}`}
                      className=""
                    >
                      <span>
                      {" "}
                          {c.name ||
                            c.title ||
                            c.original_name ||
                            c.original_title}
                          
                      
                      </span>
                      <span className=" block ml-5">
                        {c.character && `Chracter Name: ${c.character}`}
                      </span>

                      
                    </Link>
                  </li>
                ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default PersonDetails;
