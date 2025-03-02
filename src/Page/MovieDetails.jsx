import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaPlay, FaPlus, FaDownload, FaShareAlt } from "react-icons/fa";
import { api_key } from "@/Services/GlobalApi";
import { useWishlist } from "@/Context/WishlistContext";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&append_to_response=videos`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div className="text-white text-center">Loading...</div>;

  const isInWishlist = wishlist.some((m) => m.movie_id === movie.id);

  return (
    <div className="relative w-full p-20 min-h-screen text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0  w-full h-full bg-cover bg-center blur-xl"
        style={{ backgroundImage: `url(${IMAGE_BASE_URL}${movie.backdrop_path})` }}
      />
      
      {/* Content Section */}
      <div className="relative z-10 p-10  flex flex-col lg:flex-row items-start gap-8">
        {/* Movie Poster */}
        <img
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          className="w-72 rounded-lg shadow-lg"
        />

        {/* Movie Details */}
        <div>
          <h1 className="text-5xl font-bold">{movie.title}</h1>
          <p className="text-white text-lg mt-2">IMDb {movie.vote_average} • {movie.release_date.split("-")[0]}</p>
          <p className="text-gray-300 text-sm mt-2">{movie.genres.map((g) => g.name).join(" • ")}</p>
          
          <p className="text-gray-200 mt-4 max-w-3xl">{movie.overview}</p>
          
          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg flex items-center gap-2">
              <FaPlay /> Play
            </button>
            <button
              className="bg-gray-700 hover:bg-gray-700 px-6 py-3 rounded-lg flex items-center gap-2"
              onClick={() => (isInWishlist ? removeFromWishlist(movie.id) : addToWishlist(movie))}
            >
              <FaPlus /> {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
            <button className="bg-gray-700 hover:bg-gray-700 px-6 py-3 rounded-lg flex items-center gap-2">
              <FaDownload /> Download
            </button>
            <button className="bg-gray-700 hover:bg-gray-700 px-6 py-3 rounded-lg flex items-center gap-2">
              <FaShareAlt /> Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
