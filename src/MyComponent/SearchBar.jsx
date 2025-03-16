import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GlobalApi from "@/Services/GlobalApi";

const API_KEY = GlobalApi.api_key; // ✅ Get TMDB API Key

const SearchBar = ({ onClose }) => {
  const [query, setQuery] = useState(""); // ✅ Store Search Query
  const [results, setResults] = useState([]); // ✅ Store Search Results
  const searchBarRef = useRef(null);
  const navigate = useNavigate(); // ✅ For Navigation

  // ✅ Fetch results from TMDB API when user types
  useEffect(() => {
    if (query.length > 1) {
      axios
        .get(`https://api.themoviedb.org/3/search/multi`, {
          params: {
            api_key: API_KEY,
            query: query,
            language: "en-US",
          },
        })
        .then((res) => setResults(res.data.results))
        .catch((err) => console.error("Error fetching search results:", err));
    } else {
      setResults([]); // ✅ Clear results when query is empty
    }
  }, [query]);

  // ✅ Close search bar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!searchBarRef.current?.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // ✅ Handle Enter Key or Click on Search Icon
  const handleSearch = () => {
    if (query.length > 1) {
      navigate(`/search/${query}`); // ✅ Navigate to Search Results Page
      onClose(); // ✅ Close Search Bar
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-start bg-black bg-opacity-20 p-6 z-50">
      <div
        ref={searchBarRef}
        className="w-full max-w-4xl bg-[rgb(30,39,46)] text-white p-3 rounded-lg shadow-lg border border-gray-700"
      >
        <div className="flex items-center gap-2">
          {/* 🔍 Search Icon (Click to Search) */}
          <button onClick={handleSearch}>
            <FaSearch className="text-gray-400 text-lg ml-2 cursor-pointer" />
          </button>

          {/* ✅ Search Input */}
          <input
            type="text"
            placeholder="Search movies, TV shows, and more..."
            className="flex-1 bg-transparent text-white text-lg px-4 outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()} // ✅ Search on Enter
          />

          {/* ❌ Close Button */}
          <button onClick={onClose} className="text-gray-400 hover:text-white mr-3">
            <FaTimes size={18} />
          </button>
        </div>

        {/* 🔹 Display Search Results */}
        {results.length > 0 && (
          <div className="mt-3 bg-gray-800 p-2 rounded-md max-h-64 overflow-y-auto">
            {results.map((item) => (
              <div
                key={item.id}
                className="p-2 hover:bg-gray-700 cursor-pointer"
                onClick={() => {
                  navigate(`/search/${query}`);
                  onClose();
                }}
              >
                {item.title || item.name} {/* Movie or TV Show Name */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
