import React from "react";
import { movieGenres, tvGenres } from "../data/Moviedata";
import GenreCarousel from "./GenreCarousel";
const GenreList = ({movie, tv}) => {
  return (
    <div className="space-y-12 ">
      {/* ✅ Movies Section */}
      <GenreCarousel genres={movie} mediaType="movie" />
        
      {/* ✅ TV Shows Section */}
      <GenreCarousel genres={tv} mediaType="tv" />
    </div>
  );
};

export default GenreList;
