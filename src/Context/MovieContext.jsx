import { createContext, useContext, useState, useEffect } from "react";
import GlobalApi from "@/Services/GlobalApi";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTVShows, setTrendingTVShows] = useState([]);
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrendingMovies();
    fetchTrendingTVShows();
    fetchTrendingVideos();
  }, []);

  // ✅ Fetch Trending Movies
  const fetchTrendingMovies = async () => {
    try {
      setLoading(true);
      const response = await GlobalApi.getTrendingMovies();
      setTrendingMovies(response.data.results);
    } catch (err) {
      console.error("Error fetching trending movies:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch Trending TV Shows
  const fetchTrendingTVShows = async () => {
    try {
      setLoading(true);
      const response = await GlobalApi.getTrendingTVShows();
      setTrendingTVShows(response.data.results);
    } catch (err) {
      console.error("Error fetching trending TV shows:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch Trending Videos (All)
  const fetchTrendingVideos = async () => {
    try {
      setLoading(true);
      const response = await GlobalApi.getTrendingVideos();
      setTrendingVideos(response.data.results);
    } catch (err) {
      console.error("Error fetching trending videos:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MovieContext.Provider
      value={{
        trendingMovies,
        trendingTVShows,
        trendingVideos,
        loading,
        fetchTrendingMovies,  // ✅ Make functions accessible
        fetchTrendingTVShows,
        fetchTrendingVideos,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

// ✅ Custom Hook to Use Movie Context
export const useMovies = () => useContext(MovieContext);
