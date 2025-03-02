import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { movieBaseUrl, api_key } from "../Services/GlobalApi";
import { FaPlus, FaCheck, FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useWishlist } from "@/Context/WishlistContext";

const MyCarousel = ({ MovieList, display }) => {
  const { wishlist, addToWishlist } = useWishlist();
  const [trailerKey, setTrailerKey] = useState(null);
  const [playingTrailer, setPlayingTrailer] = useState(null);
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // ✅ Auto-scroll every 3 seconds (Stops on hover)
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % MovieList.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [MovieList, isHovered]);

  // ✅ Manual Navigation
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % MovieList.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + MovieList.length) % MovieList.length);
  };

  // ✅ Fetch Trailer on Click
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
      } else {
        alert("Trailer not available for this movie.");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
      alert("Trailer not available for this movie.");
    }
  };

  // ✅ Navigate to Movie Details Page
  const goToMovieDetails = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div
      className="relative w-full mx-auto overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ✅ Carousel Content */}
      <div className="relative w-full h-[600px] transition-transform duration-500 ease-in-out flex"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {MovieList.length > 0 ? (
          MovieList.map((item, index) => {
            const isInWishlist = wishlist.some((movie) => movie.movie_id === item.id);

            return (
              <div key={item.id} className="w-full flex-shrink-0 relative">
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
                      style={{ backgroundImage: `url(${movieBaseUrl}${item.backdrop_path})` }}
                    ></div>
                  )}
                </div>

                {/* ✅ Hide Info & Buttons When Trailer Plays */}
                {playingTrailer !== item.id && (
                  <>
                    {/* ✅ Movie Info */}
                    <div className="absolute bottom-32 left-0 w-full p-5 rounded-b-lg">
                      <h2 className="text-white text-xl font-semibold">{item.title || item.name || display}</h2>
                      <p className="text-white text-sm">{item.overview?.slice(0, 100)}...</p>
                    </div>

                    {/* ✅ Buttons */}
                    <div className="absolute bottom-10 left-6 flex gap-5">
                      <button
                        className="bg-gray-700 text-white text-xl font-semibold w-40 h-16 rounded-lg transition hover:bg-white hover:text-black"
                        onClick={() => fetchTrailerOnClick(item.id)}
                      >
                        Play
                      </button>

                      <button onClick={() => addToWishlist(item)} className="p-3 bg-gray-700 text-white rounded-full">
                        {isInWishlist ? <FaCheck className="text-3xl text-green-500" /> : <FaPlus className="text-3xl" />}
                      </button>

                      {/* ✅ Navigate to Movie Details Page */}
                      <button onClick={() => goToMovieDetails(item.id)} className="p-3 bg-gray-700 text-white rounded-full">
                        <IoMdInformationCircleOutline size={28} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-white text-center w-full">No Movies Found</div>
        )}
      </div>

      {/* ✅ Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full cursor-pointer"
      >
        <FaArrowLeft className="text-white text-2xl" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full cursor-pointer"
      >
        <FaArrowRight className="text-white text-2xl" />
      </button>
    </div>
  );
};

export default MyCarousel;
