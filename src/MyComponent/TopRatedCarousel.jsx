import React, { useEffect, useState, useRef } from "react";
import GlobalApi from "@/Services/GlobalApi";
import { movieBaseUrl } from "@/Services/GlobalApi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Button } from "@/components/ui/button";

const TopRatedSlider = ({ mediaType = "movie" }) => {
  const [items, setItems] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchTopRated = async () => {
      try {
        const response =
          mediaType === "movie"
            ? await GlobalApi.getPopularMovies()
            : await GlobalApi.getPopularTVshows();

        setItems(response.data.results.slice(0, 15));
      } catch (error) {
        console.error(`Error fetching top-rated ${mediaType}:`, error);
      }
    };

    fetchTopRated();
  }, [mediaType]);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-6 relative">
      <h2 className="text-xl font-bold text-white mb-3">
        Top Rated {mediaType === "movie" ? "Movies" : "TV Shows"}
      </h2>

      {/* ✅ Left Arrow */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full z-10 text-white hidden md:block"
      >
        <IoIosArrowBack size={30} />
      </button>

      {/* ✅ Scrollable Container */}
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-scroll scrollbar-hide scroll-smooth px-10"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className={`relative h-[450px] flex-shrink-0 rounded-lg overflow-hidden transition-all duration-500 ease-in-out ${
              hoveredItem === item.id ? "w-[800px] z-10" : "w-[300px] scale-100"
            }`}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            style={{
              backgroundImage:
                hoveredItem === item.id
                  ? `url(${movieBaseUrl}${item.backdrop_path})`
                  : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* ✅ Movie Poster */}
            <img
              src={`${movieBaseUrl}${item.poster_path}`}
              alt={item.title || item.name}
              className={`w-full h-full object-cover transition-all duration-500 ${
                hoveredItem === item.id ? "opacity-0" : "opacity-100"
              }`}
            />

            {/* ✅ Buttons (Slide Up on Hover) */}
            <div
              className={`absolute bottom-4 left-2 flex  gap-4 items-start transition-all duration-500 ease-in-out ${
                hoveredItem === item.id
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 translate-y-6 pointer-events-none"
              }`}
            >
              {/* Episode Button */}
              <Button className="hover:bg-white hover:text-black flex flex-col items-center justify-center w-40 h-20 text-xl font-semibold bg-gray-700 text-white rounded-lg transition">
                <span>Episode 1</span>
                <span className="text-sm">Watch Now</span>
              </Button>

              {/* Icons */}
              <div className="flex items-center gap-5">
                <Button variant="amazon" size="round_md">
                  <FaPlus className="text-3xl" />
                </Button>
                <Button variant="amazon" size="round_md">
                  <IoMdInformationCircleOutline size="4xl" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Right Arrow */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full z-10 text-white hidden md:block"
      >
        <IoIosArrowForward size={30} />
      </button>
    </div>
  );
};

export default TopRatedSlider;
