import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import GlobalApi from "@/Services/GlobalApi";
import { FaPlus, FaPlay } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Button } from "@/components/ui/button";

const API_KEY = GlobalApi.api_key; // ✅ TMDB API Key
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original"; // ✅ TMDB Image URL

const SearchResultsPage = () => {
  const { query } = useParams(); // ✅ Get Search Query from URL
  const [results, setResults] = useState([]); // ✅ Store Search Results
  const [loading, setLoading] = useState(true); // ✅ Loading State
  const [hoveredMovie, setHoveredMovie] = useState(null); // ✅ Track Hovered Movie

  // ✅ Fetch Results from TMDB When Page Loads
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.themoviedb.org/3/search/multi`, {
        params: {
          api_key: API_KEY,
          query: query,
          language: "en-US",
        },
      })
      .then((res) => {
        setResults(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching search results:", err);
        setLoading(false);
      });
  }, [query]);

  return (
    <div className="min-h-screen bg-black py-20 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : results.length === 0 ? (
        <p className="text-center text-gray-400">No results found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((item) => (
            <div
              key={item.id}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredMovie(item.id)}
              onMouseLeave={() => setHoveredMovie(null)}
            >
              {/* ✅ Background Image */}
              {item.poster_path && (
                <img
                  src={`${IMAGE_BASE_URL}${item.poster_path}`}
                  alt={item.title || item.name}
                  className="w-full h-56 object-cover rounded-lg transition-opacity duration-300 group-hover:opacity-75"
                />
              )}

              {/* ✅ Overlay Text */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-transparent p-4">
                <h2 className="text-lg font-semibold">
                  {item.title || item.name}
                </h2>
                <p className="text-sm text-gray-300">{item.media_type}</p>
              </div>

              {/* ✅ Hover Card with Buttons */}
              {hoveredMovie === item.id && (
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-90 text-white p-4 flex flex-col items-center rounded-lg shadow-lg transition-all duration-500 ease-in-out scale-100 opacity-0 hover:scale-110 hover:opacity-100 z-20">
                  <div className="flex gap-2 mt-5 text-center ">
                    <Button
                      variant="amazon"
                      size="rounded_sm"
                      className="h-10 w-16 rounded-md"
                    >
                      Play
                    </Button>

                    <Button
                      variant="amazon"
                      size="rounded_sm"
                      className="h-10 w-10 rounded-full"
                    >
                      <FaPlus className="text-3xl" />
                    </Button>
                    <Button
                      variant="amazon"
                      size="rounded_md"
                      className="h-10 w-10 rounded-full"
                    >
                      <IoMdInformationCircleOutline size="4xl" />
                    </Button>
                  </div>
                  <p className="text-xs mt-1 text-center mx-4">{item.overview?.slice(0, 100)}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
