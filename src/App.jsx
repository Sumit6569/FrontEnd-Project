import React from "react";
import { Link, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Loading from "./components/Templates/Loading";
import TrendingSideNav from "./components/TrendingSideNav";
import PopularSideNav from "./components/PopularSideNav";
import MovieSideNav from "./components/MovieSideNav";
import TvShows from "./components/TvShows";
import People from "./components/People";
import MovieDetails from "./components/MovieDetails";
import TvDetails from "./components/TvDetails";
import PeopleDetails from "./components/PersonDetails";
import Trailer from "./components/Templates/Trailer";
import NoTfound from "./components/NoTfound";
function App() {
  return (
    <div className=" bg-[#1F1E24] w-screen h-screen flex ">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/Home/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/trending" element={<TrendingSideNav />} />
        <Route path="/Popular" element={<PopularSideNav />} />

        <Route path="/movie" element={<MovieSideNav />} />
        <Route path="/movie/details/:id" element={<MovieDetails />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer />} />
        </Route>

        <Route path="/tv" element={<TvShows />} />
        <Route path="/tv/details/:id" element={<TvDetails />}>
          <Route path="/tv/details/:id/trailer" element={<Trailer />} />
        </Route>

        <Route path="/person" element={<People />} />
        <Route path="/person/details/:id" element={<PeopleDetails />} />

        <Route path="*" element={<NoTfound />} />
      </Routes>
    </div>
  );
}

export default App;
