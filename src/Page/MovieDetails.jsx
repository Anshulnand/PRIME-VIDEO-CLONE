import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  FaPlay,
  FaPlus,
  FaDownload,
  FaShareAlt,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
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

        // Extract YouTube trailer URL
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
      <div className="text-white text-center p-20 text-2xl">Loading...</div>
    );

  const isInWishlist = wishlist.some((m) => m.movie_id === movie.id);

  return (
    <div className="relative w-full min-h-screen p-20 text-white">
      {/* Background Blur Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center blur-2xl opacity-50"
        style={{
          backgroundImage: `url(${IMAGE_BASE_URL}${movie.backdrop_path})`,
        }}
      />

      {/* Content Section */}
      <div className="relative z-10 p-6 lg:p-16 flex flex-col lg:flex-row items-start gap-10">
        {/* Movie Poster */}
        <img
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          className="w-72 lg:w-80 rounded-2xl shadow-xl transition-transform duration-300 hover:scale-105"
        />

        {/* Movie Details */}
        <div className="max-w-3xl">
          <h1 className="text-4xl lg:text-5xl font-extrabold">{movie.title}</h1>
          <p className="text-gray-300 text-lg mt-2">
            <span className="font-semibold text-yellow-400">
              IMDb {movie.vote_average}
            </span>{" "}
            • {movie.release_date.split("-")[0]}
          </p>
          <p className="text-gray-400 text-sm mt-2">
            {movie.genres.map((g) => g.name).join(" • ")}
          </p>

          <p className="text-gray-200 mt-5 text-lg leading-relaxed">
            {movie.overview}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-6">
            {trailerUrl ? (
              <Button
                variant="amazon"
                size="square_md"
                onClick={() => setShowTrailer(true)}
              >
                <FaPlay /> Watch Trailer
              </Button>
            ) : (
              <Button variant="amazon" size="square_md" disabled>
                <FaPlay /> Trailer Not Available
              </Button>
            )}

            <Button
              variant="amazon"
              size="square_md"
              className="w-[250px]"
              onClick={() =>
                isInWishlist
                  ? removeFromWishlist(movie.id)
                  : addToWishlist(movie)
              }
            >
              {isInWishlist ? <FaCheck /> : <FaPlus />}{" "}
              {isInWishlist ? "Added to Wishlist" : "Add to Wishlist"}
            </Button>

            <Button variant="amazon" size="square_md">
              <FaDownload /> Download
            </Button>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="relative w-full max-w-4xl">
            <button
              className="absolute top-0 right-0 m-4 text-white text-3xl hover:text-gray-400"
              onClick={() => setShowTrailer(false)}
            >
              <FaTimes />
            </button>
            <iframe
              className="w-full h-[500px] rounded-lg shadow-lg"
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
