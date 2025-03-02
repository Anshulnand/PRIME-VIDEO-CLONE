import React from "react";
import { useWishlist } from "../Context/WishlistContext"; // ✅ Import wishlist context
import { Button } from "@/components/ui/button"; // ✅ Import button component
import { FaTrash } from "react-icons/fa"; // ✅ Import trash icon

const WishlistPage = () => {
  const { wishlist, loading, error, removeFromWishlist } = useWishlist(); // ✅ Get wishlist data & remove function

  if (loading) return <div className="text-white text-center mt-10">Loading your wishlist...</div>;
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6 mt-10 text-center">Your Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-400 text-center">No movies in your wishlist.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((movie) => (
            <div
              key={movie.movie_id}
              className="relative group overflow-hidden rounded-lg shadow-lg transition transform hover:scale-105"
            >
              {/* Movie Poster */}
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto object-cover rounded-lg"
              />

              {/* Movie Info on Hover */}
              <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-4">
                <h3 className="text-lg font-bold">{movie.title}</h3>
                <p className="text-sm text-gray-300 text-center">
                  {movie.overview ? movie.overview.slice(0, 100) + "..." : "No description available."}
                </p>
                
                {/* ✅ Remove from Wishlist Button */}
                <Button
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 transition flex items-center gap-2"
                  onClick={() => removeFromWishlist(movie.movie_id)}
                >
                  <FaTrash className="text-lg" />
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
