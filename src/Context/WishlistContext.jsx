import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react"; // Clerk authentication hook
import { supabase } from "../Services/supabaseClient"; // Supabase instance

// Create WishlistContext
const WishlistContext = createContext();

// Custom hook to access WishlistContext
export const useWishlist = () => {
  return useContext(WishlistContext);
};

// WishlistProvider component
export const WishlistProvider = ({ children }) => {
  const { user } = useUser(); // Get current user from Clerk
  const [wishlist, setWishlist] = useState([]); // State to store wishlist items
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch wishlist from Supabase
  const fetchWishlist = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("wishlist_movies")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;
      setWishlist(data); // ✅ Store fetched wishlist
    } catch (err) {
      setError("Error fetching wishlist.");
      console.error("Error fetching wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Fetch wishlist on user login
  useEffect(() => {
    fetchWishlist();
  }, [user]);

  // ✅ Add to wishlist
  const addToWishlist = async (movie) => {
    if (!user) {
      alert("Please sign in first.");
      return;
    }

    const isInWishlist = wishlist.some((m) => m.movie_id === movie.id);
    if (isInWishlist) {
      console.log("Movie is already in wishlist!");
      return;
    }

    try {
      // Add movie to Supabase
      const { error } = await supabase.from("wishlist_movies").insert([
        {
          user_id: user.id,
          movie_id: movie.id,
          title: movie.title || movie.name,
          poster_path: movie.poster_path,
          release_date: movie.release_date || movie.first_air_date,
          overview: movie.overview,
          genre: JSON.stringify(movie.genres),
        },
      ]);

      if (error) throw error;

      // ✅ Update state immediately
      setWishlist((prev) => [...prev, { ...movie, movie_id: movie.id }]);

      console.log("Movie added to wishlist");
    } catch (error) {
      console.error("Error adding movie to wishlist:", error);
    }
  };

  // ✅ Remove from wishlist (Supabase & UI update)
  const removeFromWishlist = async (movieId) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("wishlist_movies")
        .delete()
        .eq("user_id", user.id)
        .eq("movie_id", movieId);

      if (error) throw error;

      // ✅ Update state immediately
      setWishlist((prev) => prev.filter((movie) => movie.movie_id !== movieId));

      console.log("Movie removed from wishlist");
    } catch (error) {
      console.error("Error removing movie from wishlist:", error);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, loading, error, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
