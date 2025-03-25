import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { movieBaseUrl, api_key } from "@/Services/GlobalApi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaPlay } from "react-icons/fa6";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/Context/WishlistContext";
import axios from "axios";
import TrailerModal from "./TrailerModal";

const TopRatedSlider = ({ mediaType = "movie", uniqueKey }) => {
  const [items, setItems] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const containerRef = useRef(null);
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopRated = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/${mediaType}/top_rated?api_key=${api_key}&page=${
            uniqueKey + 1
          }`
        );
        setItems(response.data.results.slice(0, 15));
      } catch (error) {
        console.error(`Error fetching top-rated ${mediaType}:`, error);
      }
    };
    fetchTopRated();
  }, [uniqueKey]);

  const scrollLeft = () =>
    containerRef.current?.scrollBy({ left: -400, behavior: "smooth" });
  const scrollRight = () =>
    containerRef.current?.scrollBy({ left: 400, behavior: "smooth" });

  const playTrailer = async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/${mediaType}/${movieId}/videos?api_key=${api_key}`
      );
      const officialTrailer = response.data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      setTrailerKey(officialTrailer ? officialTrailer.key : null);
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  const goToDetails = (id) => {
    navigate(mediaType === "tv" ? `/tv/${id}` : `/movie/${id}`);
  };

  return (
    <div className="space-y-6 mt-10 relative">
      <h2 className="text-xl font-bold text-white mb-3">
        Top Rated {mediaType === "movie" ? "Movies" : "TV Shows"}
      </h2>

      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full z-10 text-white hidden md:block"
      >
        <IoIosArrowBack size={30} />
      </button>

      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-scroll scrollbar-hide scroll-smooth px-10"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className={`relative h-[450px] flex-shrink-0 rounded-lg overflow-hidden transition-all duration-500 ease-in-out ${
              hoveredItem === item.id
                ? "md:w-[800px] z-10"
                : "md:w-[300px] scale-100"
            }`}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            style={{
              backgroundImage:
                hoveredItem === item.id && window.innerWidth >= 768
                  ? `url(${movieBaseUrl}${item.backdrop_path})`
                  : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <img
              src={`${movieBaseUrl}${item.poster_path}`}
              alt={item.name || item.title} // ✅ Ensures TV shows display correctly
              className={`w-full h-full object-cover transition-all duration-500 ${
                hoveredItem === item.id && window.innerWidth >= 768
                  ? "opacity-0"
                  : "opacity-100"
              }`}
            />

            <div
              className={`absolute bottom-10 left-2 flex gap-4 items-center transition-all duration-500 ease-in-out ${
                hoveredItem === item.id || window.innerWidth < 640
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            >
              <Button
                variant="amazon"
                size="square_md"
                onClick={() => playTrailer(item.id)}
              >
                <span className="sm:block md:hidden">
                  <FaPlay />
                </span>
                <span className="hidden md:block">Play</span>
              </Button>
              <Button
                variant="amazon"
                size="round_md"
                onClick={() => goToDetails(item.id)}
              >
                <IoMdInformationCircleOutline />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full z-10 text-white hidden md:block"
      >
        <IoIosArrowForward size={30} />
      </button>

      <TrailerModal
        trailerKey={trailerKey}
        onClose={() => setTrailerKey(null)}
      />
    </div>
  );
};

export default TopRatedSlider;
