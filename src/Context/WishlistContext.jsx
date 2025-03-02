import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';  // Clerk hook to get the current user
import { supabase } from '../Services/supabaseClient';  // Supabase client

// Create WishlistContext
const WishlistContext = createContext();

// Custom hook to access WishlistContext
export const useWishlist = () => {
  return useContext(WishlistContext);
};

// WishlistProvider component to fetch and provide the wishlist data
export const WishlistProvider = ({ children }) => {
  const { user } = useUser();  // Get user data from Clerk
  const [wishlist, setWishlist] = useState([]);  // State to store the wishlist
  const [loading, setLoading] = useState(true);  // State for loading status
  const [error, setError] = useState(null);  // State for error messages

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) return;  // Exit if no user is logged in

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('wishlist_movies')  // Supabase table where movie details are stored
          .select('*')  // Select all columns
          .eq('user_id', user.id);  // Filter by the logged-in user's ID

        if (error) throw error;  // Handle any errors
        setWishlist(data);  // Set the wishlist data from Supabase
      } catch (err) {
        setError('Error fetching wishlist.');
        console.error('Error fetching wishlist:', err);
      } finally {
        setLoading(false);  // Set loading to false once data is fetched
      }
    };

    fetchWishlist();  // Fetch wishlist when the user is available
  }, [user]);  // Run effect whenever the user changes




  const removeFromWishlist = (movieId) => {
    setWishlist((prev) => prev.filter((movie) => movie.movie_id !== movieId));
  };
  

  // Function to add a movie to the wishlist
  const addToWishlist = async (movie) => {
    if (!user) {
      alert("Please sign in first.");
      return;
    }
  
    // ✅ Check if movie is already in wishlist
    const isInWishlist = wishlist.some((m) => m.movie_id === movie.id);
    if (isInWishlist) {
      console.log("Movie is already in wishlist!");
      return;
    }
  
    try {
      // ✅ Add movie to Supabase
      const { error } = await supabase.from("wishlist_movies").insert([
        {
          user_id: user.id,
          movie_id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          overview: movie.overview,
          genre: movie.genres,
        },
      ]);
  
      if (error) throw error;
  
      // ✅ Update the wishlist **immediately**
      setWishlist((prev) => [...prev, { ...movie, movie_id: movie.id }]);
  
      console.log("Movie added to wishlist");
    } catch (error) {
      console.error("Error adding movie to wishlist:", error);
    }
  };
  

  return (
    <WishlistContext.Provider value={{ wishlist, loading, error, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
