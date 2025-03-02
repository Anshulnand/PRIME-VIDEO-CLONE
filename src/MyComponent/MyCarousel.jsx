import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Flickity from "react-flickity-component";
import "flickity/css/flickity.css";
import axios from "axios";
import { movieBaseUrl, api_key } from "../Services/GlobalApi";
import { Button } from "@/components/ui/button";
import { FaPlus, FaCheck } from "react-icons/fa6";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useWishlist } from "@/Context/WishlistContext";

// ✅ Flickity Options
const flickityOptions = {
  wrapAround: true,
  autoPlay: 3000,
  pauseAutoPlayOnHover: true,
  contain: true,
  prevNextButtons: true,
  pageDots: true,
  draggable: true,
  cellAlign: "center",
  selectedAttraction: 0.01,
  friction: 0.15,
  freeScroll: false,
  adaptiveHeight: true,
};

const MyCarousel = ({ MovieList, display }) => {
  const { wishlist, addToWishlist } = useWishlist();
  const [trailerKey, setTrailerKey] = useState(null);
  const [playingTrailer, setPlayingTrailer] = useState(null);
  const [trailerAvailable, setTrailerAvailable] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch trailer when Play button is clicked
  const fetchTrailerOnClick = async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${api_key}`
      );
      const trailers = response.data.results;
      const officialTrailer = trailers.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );

      if (officialTrailer) {
        setTrailerKey(officialTrailer.key);
        setPlayingTrailer(movieId);
        setTrailerAvailable(true);
      } else {
        setTrailerAvailable(false);
        alert("Trailer not available for this movie.");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
      setTrailerAvailable(false);
      alert("Trailer not available for this movie.");
    }
  };

  // ✅ Navigate to Movie Details Page
  const goToMovieDetails = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      <Flickity options={flickityOptions} className="carousel">
        {MovieList.length > 0 ? (
          MovieList.map((item) => {
            const isInWishlist = wishlist.some(
              (movie) => movie.movie_id === item.id
            );

            return (
              <div
                key={item.id}
                className="carousel-cell w-full h-[600px] flex items-center justify-center relative"
              >
                {/* ✅ Play Trailer Inside Image */}
                <div className="relative w-full h-full bg-cover bg-center rounded-lg">
                  {playingTrailer === item.id && trailerKey ? (
                    <iframe
                      className="w-full h-full rounded-lg"
                      src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
                      title="YouTube video player"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div
                      className="w-full h-full bg-cover bg-center rounded-lg"
                      style={{
                        backgroundImage: `url(${movieBaseUrl}${item.backdrop_path})`,
                      }}
                    ></div>
                  )}
                </div>

                {/* ✅ Hide Info & Buttons When Trailer Plays */}
                {playingTrailer !== item.id && (
                  <>
                    {/* ✅ Movie Info */}
                    <div className="absolute bottom-32 left-0 w-full p-5 rounded-b-lg">
                      <h2 className="text-white text-xl font-semibold">
                        {item.title || item.name || display}
                      </h2>
                      <p className="text-white text-sm">
                        {item.overview?.slice(0, 100)}...
                      </p>
                    </div>

                    {/* ✅ Buttons */}
                    <div className="absolute bottom-10 left-6 flex gap-5">
                      <Button
                        className="hover:bg-white hover:text-black flex flex-col items-center justify-center w-40 h-16 text-xl font-semibold bg-gray-700 text-white rounded-lg transition"
                        onClick={() => fetchTrailerOnClick(item.id)}
                      >
                        <span> Play</span>
                      </Button>

                      <Button
                        variant="amazon"
                        size="round_md"
                        onClick={() => addToWishlist(item)}
                      >
                        {isInWishlist ? (
                          <FaCheck className="text-3xl text-green-500" />
                        ) : (
                          <FaPlus className="text-3xl" />
                        )}
                      </Button>

                      {/* ✅ Navigate to Movie Details Page */}
                      <Button
                        variant="amazon"
                        size="round_md"
                        onClick={() => goToMovieDetails(item.id)}
                      >
                        <IoMdInformationCircleOutline size={28} />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            );
          })
        ) : (
          <div className="carousel-cell text-white text-center">
            No Movies Found
          </div>
        )}
      </Flickity>

      {/* ✅ Fix Page Dots Styling */}
      <style>
        {`
          .flickity-page-dots {
            bottom: 10px;
          }
          .flickity-page-dots .dot {
            background: white;
            width: 10px;
            height: 10px;
          }
        `}
      </style>
    </div>
  );
};

export default MyCarousel;
