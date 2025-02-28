import axios from "axios";

// Base URL of the movie API
export const movieBaseUrl = "https://image.tmdb.org/t/p/original"; // ✅ For movie images
export const api_key = "839ef7ce42ba3364f1b22af07a60ecb7";

// ✅ Change `getTrendingVideos` to a function
const getTrendingVideos = () => {
  return axios.get(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}`
  );
};

const getPopularMovies = () => {
  return axios.get(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}`
  );
};

const getTrendingTVShows = () => {
  return axios.get(
    `https://api.themoviedb.org/3/trending/tv/week?api_key=${api_key}`
  );
};
const getTrendingMovies = () => {
  return axios.get(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${api_key}`
  );
};
const getPopularTVshows = () => {
  return axios.get(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${api_key}`
  );
};
export default {
  api_key,
  getTrendingVideos,
  getPopularMovies,
  getPopularTVshows,
  getTrendingTVShows,
  getTrendingMovies // ✅ Now it's a function
};
