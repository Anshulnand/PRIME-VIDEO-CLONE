import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { movieBaseUrl, api_key } from "../Services/GlobalApi";
import { FaPlus, FaCheck, FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useWishlist } from "@/Context/WishlistContext";
import { Button } from "@/components/ui/button";

const MyCarousel = ({ MovieList, mediaType = "movie", display }) => {
  const { wishlist, addToWishlist } = useWishlist();
  const [trailerKey, setTrailerKey] = useState(null);
  const [playingTrailer, setPlayingTrailer] = useState(null);
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  // ✅ Auto-scroll every 2 seconds (Stops when trailer is playing)
  useEffect(() => {
    if (!isHovered && !playingTrailer) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 2000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isHovered, playingTrailer]);

  // ✅ Next and Previous Slide Handlers
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % MovieList.length);
    setPlayingTrailer(null);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + MovieList.length) % MovieList.length
    );
    setPlayingTrailer(null);
  };

  // ✅ Fetch Trailer (Supports Both Movies & TV Shows)
  const fetchTrailerOnClick = async (itemId, type) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/${type}/${itemId}/videos?api_key=${api_key}`
      );
      const trailers = response.data.results;
      const officialTrailer = trailers.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );

      if (officialTrailer) {
        setTrailerKey(officialTrailer.key);
        setPlayingTrailer(itemId);
      } else {
        alert("Trailer not available.");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
      alert("Trailer not available.");
    }
  };

  // ✅ Stop Trailer
  const stopTrailer = () => {
    setPlayingTrailer(null);
    setTrailerKey(null);
  };

  // ✅ Navigate to Movie/TV Show Details Page
  const goToDetails = (itemId, type) => {
    const correctType = type || mediaType; // Ensure correct media type
    navigate(`/${correctType}/${itemId}`);
  };
  
  

  return (
    <div
      className="relative w-full mx-auto overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ✅ Carousel Content (One Item at a Time) */}
      <div
        className="relative w-full flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {MovieList.length > 0 ? (
          MovieList.map((item) => {
            const isInWishlist = wishlist.some((movie) => movie.id === item.id);
            const itemType = item.media_type || mediaType || "movie";

            return (
              <div
                key={item.id}
                className="relative flex-shrink-0 w-full transition-transform duration-300 ease-in-out"
              >
                {/* ✅ Movie Poster or Trailer */}
                <div className="relative w-full h-[400px] md:h-[500px] lg:h-[680px] bg-cover bg-center rounded-lg">
                  {playingTrailer === item.id && trailerKey ? (
                    <div className="relative w-full h-full">
                      <iframe
                        className="w-full h-full rounded-lg"
                        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
                        title="YouTube video player"
                        allowFullScreen
                      ></iframe>

                      {/* ✅ Stop Trailer Button */}
                      <button
                        onClick={stopTrailer}
                        className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-md"
                      >
                        Close Trailer
                      </button>
                    </div>
                  ) : (
                    <div
                      className="w-full h-full bg-cover bg-center rounded-lg"
                      style={{
                        backgroundImage: `url(${movieBaseUrl}${item.backdrop_path})`,
                      }}
                    >
                      {/* ✅ Fade-to-Black Effect */}
                      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent"></div>
                    </div>
                  )}
                </div>

                {/* ✅ Hide Info & Buttons When Trailer is Playing */}
                {!playingTrailer && (
                  <div className="absolute bottom-10 md:left-6 w-full p-5 rounded-lg z-10">
                    <h2 className="text-white md:text-xl font-semibold">
                      {item.title || item.name || display}
                    </h2>
                    <p className="text-white text-xs md:text-sm">
                      {item.overview?.slice(0, 100)}...
                    </p>

                    {/* ✅ Buttons */}
                    <div className="flex gap-4 mt-3">
                      <Button
                        variant="amazon"
                        size="square_md"
                        onClick={() => fetchTrailerOnClick(item.id, itemType)}
                      >
                        Play
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

                      <Button
                        variant="amazon"
                        size="round_md"
                        onClick={() => goToDetails(item.id, itemType)}
                      >
                        <IoMdInformationCircleOutline />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-white text-center w-full">No Items Found</div>
        )}
      </div>

      {/* ✅ Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-3 rounded-full cursor-pointer z-20"
      >
        <FaArrowLeft className="text-white md:text-3xl" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-3 rounded-full cursor-pointer z-20"
      >
        <FaArrowRight className="text-white md:text-3xl" />
      </button>
    </div>
  );
};

export default MyCarousel;
