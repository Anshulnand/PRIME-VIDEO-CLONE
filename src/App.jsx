import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./MyComponent/Header";
import MoviesPage from "./Page/MoviesPage";
import Home  from "./Page/Home";
import TvShowsPage from "./Page/TvShowsPage";
import { MovieProvider } from "./Context/MovieContext";
import SearchResultsPage from "./Page/SearchResultsPage";
import { ClerkProvider } from "@clerk/clerk-react";
import { WishlistProvider } from "./Context/WishlistContext";
import WishlistPage from './Page/WishlistPage';
import MovieDetails from "./Page/MovieDetails";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const App = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
   <WishlistProvider>
    <MovieProvider>
    <Router>
      <div className="min-h-screen  bg-black text-white">
        <Header /> {/* Header always visible */}
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/home" element={<Home></Home>} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/tv-shows" element={<TvShowsPage />} />
          <Route path="/search/:query" element={<SearchResultsPage />} /> {/* ✅ Add Search Route */}
          <Route path="/wishlist" element={<WishlistPage />} />
        
          <Route path="/movie/:id" element={<MovieDetails />} />
         
        </Routes>
      </div>
    </Router>
    </MovieProvider>
    </WishlistProvider>
    </ClerkProvider>
  );
};

export default App;
