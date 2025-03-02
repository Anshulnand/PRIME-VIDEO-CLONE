import React from "react";
import Slider from "../MyComponent/Slider";
import GenreList from "../MyComponent/GenreList";
import { movieGenres, tvGenres } from "../data/Moviedata";


const Home = () => {
  return (
    <>
      <Slider trending="trendingall" />
      <GenreList movie={movieGenres} tv={tvGenres} />
    </>
  );
};

export default Home;
