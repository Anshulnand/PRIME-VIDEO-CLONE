import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaPlay, FaPlus, FaDownload, FaCheck, FaTimes } from "react-icons/fa";
import { api_key } from "@/Services/GlobalApi";
import { useWishlist } from "@/Context/WishlistContext";
import { Button } from "@/components/ui/button";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&append_to_response=videos`
        );
        setMovie(response.data);

        const trailers = response.data.videos.results;
        const officialTrailer = trailers.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        if (officialTrailer) {
          setTrailerUrl(`https://www.youtube.com/embed/${officialTrailer.key}`);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (!movie)
    return (
      <div className="text-white text-center py-20 text-2xl">Loading...</div>
    );

  const isInWishlist = wishlist.some((m) => m.movie_id === movie.id);

  return (
    <div className="relative w-full min-h-screen py-16 px-6 sm:py-24 sm:px-10 text-white">
      {/* Background Blur Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center blur-xl opacity-50"
        style={{ backgroundImage: `url(${IMAGE_BASE_URL}${movie.backdrop_path})` }}
      />

      {/* Content Section */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-6">
        {/* Movie Poster */}
        <img
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          className="w-40 sm:w-52 md:w-60 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
        />

        {/* Movie Details */}
        <div className="w-full text-center lg:text-left">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold">
            {movie.title}
          </h1>
          <p className="text-gray-300 text-sm sm:text-base mt-2">
            <span className="font-semibold text-yellow-400">
              IMDb {movie.vote_average}
            </span>{" "}
            • {movie.release_date.split("-")[0]}
          </p>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            {movie.genres.map((g) => g.name).join(" • ")}
          </p>

          <p className="text-gray-200 mt-4 text-sm sm:text-base leading-relaxed">
            {movie.overview}
          </p>

          {/* Action Buttons (Optimized for Mobile) */}
          <div className="flex flex-col items-center sm:flex-row gap-3 mt-6">
            <Button
              className="w-48 sm:w-48 md:w-48 text-xs"
              variant="amazon"
              size="square_md"
              onClick={() => setShowTrailer(true)}
            
              disabled={!trailerUrl}
            >
              <FaPlay /> {trailerUrl ? "Watch Trailer" : "Unavailable"}
            </Button>

            <Button
              variant="amazon"
              size="square_md"
              className="w-48 sm:w-48 md:w-48 text-xs"
              onClick={() =>
                isInWishlist ? removeFromWishlist(movie.id) : addToWishlist(movie)
              }
            >
              {isInWishlist ? <FaCheck /> : <FaPlus />}{" "}
              {isInWishlist ? "Added" : "Add to Wishlist"}
            </Button>

            <Button
              variant="amazon"
              size="square_md"
              className="w-48 sm:w-48 md:w-48 text-xs"
            >
              <FaDownload /> Download
            </Button>
          </div>
        </div>
      </div>

      {/* Fullscreen Trailer Modal */}
      {showTrailer && (
        <div
          className="fixed inset-0 bg-black bg-opacity-100 flex justify-center items-center z-50"
          onClick={() => setShowTrailer(false)} // Clicking outside closes modal
        >
          <div
            className="relative w-full h-full flex justify-center items-center"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <button
              className="absolute top-4 right-4 text-white text-3xl hover:text-gray-400"
              onClick={() => setShowTrailer(false)}
            >
              <FaTimes />
            </button>
            <iframe
              className="w-full h-[90vw] sm:h-[80vh] max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
              src={trailerUrl}
              title="Movie Trailer"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailPage;
