import React, { useEffect } from "react";
import { useMovies } from "../Context/MovieContext"; // ✅ Import context
import MyCarousel from "./MyCarousel";


const Slider = ({ trending }) => {
  const { 
    trendingMovies, 
    trendingTVShows, 
    trendingVideos, 
    loading, 
    fetchTrendingMovies, 
    fetchTrendingTVShows, 
    fetchTrendingVideos 
  } = useMovies(); // ✅ Added fetch functions

  // ✅ Fetch the correct data when `trending` changes
  useEffect(() => {
    if (trending === "trendingmovies") {
      fetchTrendingMovies();
    } else if (trending === "trendingtv") {
      fetchTrendingTVShows();
    } else if (trending === "trendingall") {
      fetchTrendingVideos();
    }
  }, [trending]); // Runs every time `trending` prop changes

  if (loading) return <p className="text-white text-center">Loading...</p>;

  // ✅ Select the correct movie list
  let MovieList = [];
  let display="";
  if (trending === "trendingall") {
    MovieList = trendingVideos;
    display=" ";
  } else if (trending === "trendingmovies") {
    MovieList = trendingMovies;
    display="Movies";
  } else if (trending === "trendingtv") {
    MovieList = trendingTVShows;
    display="Series";
  }
  console.log("TV Shows Data: ", trendingTVShows);

  return (
    <div className="w-full sm:h-[400px] md:h-[670px] bg-slate-700 relative">
      <MyCarousel MovieList={MovieList} id={MovieList?.id} display={display}/>
      
    </div>
  );
};

export default Slider;
