import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion"; // ✅ Import Framer Motion
import Header from "./MyComponent/Header";
import MoviesPage from "./Page/MoviesPage";
import Home from "./Page/Home";
import TvShowsPage from "./Page/TvShowsPage";
import { MovieProvider } from "./Context/MovieContext";
import SearchResultsPage from "./Page/SearchResultsPage";
import { ClerkProvider } from "@clerk/clerk-react";
import { WishlistProvider } from "./Context/WishlistContext";
import WishlistPage from "./Page/WishlistPage";
import MovieDetails from "./Page/MovieDetails";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const AnimatedRoutes = () => {
  const location = useLocation(); // ✅ Detects route changes

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 30 }} // ✅ Start hidden, slightly below
        animate={{ opacity: 1, y: 0 }} // ✅ Fade & slide up
        exit={{ opacity: 0, y: -30 }} // ✅ Fade & slide up on exit
        transition={{ duration: 0.5, ease: "easeOut" }} // ✅ Smooth effect
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/tv-shows" element={<TvShowsPage />} />
          <Route path="/search/:query" element={<SearchResultsPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <WishlistProvider>
        <MovieProvider>
          <Router>
            <div className="min-h-screen  bg-black text-white">
              <Header /> {/* ✅ Header always visible */}
              <AnimatedRoutes /> {/* ✅ Apply animation wrapper */}
            </div>
          </Router>
        </MovieProvider>
      </WishlistProvider>
    </ClerkProvider>
  );
};

export default App;
