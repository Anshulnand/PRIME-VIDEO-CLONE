import React from "react";
import { movieGenres, tvGenres } from "../data/Moviedata";
import GenreCarousel from "./GenreCarousel";
const GenreList = ({movie, tv}) => {
  return (
    <div className="space-y-12 ml-2 ">
        {/* ✅ TV Shows Section */}
        <GenreCarousel genres={tv} mediaType="tv"/>
      {/* ✅ Movies Section */}
      <GenreCarousel genres={movie} mediaType="movie" />
        
    
    </div>
  );
};

export default GenreList;
