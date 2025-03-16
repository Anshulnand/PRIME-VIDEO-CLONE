import React, { useEffect } from "react";
import Slider from "../MyComponent/Slider";
import GenreList from "../MyComponent/GenreList";
import { movieGenres, tvGenres } from "../data/Moviedata";


const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // ✅ Scrolls to the top when page loads
  }, []);

  return (
    <>
    
      <Slider trending="trendingall" />
      <GenreList movie={movieGenres} tv={tvGenres} />
    </>
  );
};

export default Home;
