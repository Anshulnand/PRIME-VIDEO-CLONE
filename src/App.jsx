import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./MyComponent/Header";
import MoviesPage from "./Page/MoviesPage";
import Home  from "./Page/Home";
import TvShowsPage from "./Page/TvShowsPage";
import { MovieProvider } from "./Context/MovieContext";
import SearchResultsPage from "./Page/SearchResultsPage";

const App = () => {
  return (
    <MovieProvider>
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Header /> {/* Header always visible */}
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/home" element={<Home></Home>} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/tv-shows" element={<TvShowsPage />} />
          <Route path="/search/:query" element={<SearchResultsPage />} /> {/* ✅ Add Search Route */}
       
        </Routes>
      </div>
    </Router>
    </MovieProvider>
  );
};

export default App;
