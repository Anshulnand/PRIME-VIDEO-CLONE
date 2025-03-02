import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import axios from "axios";
import { Button } from "@/components/ui/button";
import { api_key } from "@/Services/GlobalApi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FaPlus, FaCheck } from "react-icons/fa6";
import { IoMdInformationCircleOutline } from "react-icons/io";
import TopRatedCarousel from "./TopRatedCarousel";
import { useWishlist } from "../Context/WishlistContext";
import TrailerModal from "./TrailerModal"; // ✅ Import reusable modal

const GenreCarousel = ({ genres, mediaType }) => {
  if (!genres) return null;
  const [itemsByGenre, setItemsByGenre] = useState({});
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const { wishlist, addToWishlist } = useWishlist();
  const [trailerKey, setTrailerKey] = useState(null); // ✅ Store trailer key
  const navigate = useNavigate(); // ✅ React Router Navigation

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const genreItems = {};
    await Promise.all(
      genres.map(async (genre) => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${api_key}&with_genres=${genre.id}`
          );
          genreItems[genre.name] = response.data.results.slice(0, 20);
        } catch (error) {
          console.error(`Error fetching ${genre.name} ${mediaType}:`, error);
        }
      })
    );
    setItemsByGenre(genreItems);
  };

  // ✅ Fetch trailer video
  const playTrailer = async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/${mediaType}/${movieId}/videos?api_key=${api_key}`
      );
      const trailers = response.data.results;
      const officialTrailer = trailers.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      if (officialTrailer) {
        setTrailerKey(officialTrailer.key); // ✅ Show modal with trailer
      } else {
        alert("No trailer available!");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  // ✅ Navigate to Movie Details Page
  const goToMovieDetails = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="space-y-8">
      {genres.map((genre, genreIndex) => (
        <React.Fragment key={genre.id}>
          {genreIndex % 3 === 0 && <TopRatedCarousel mediaType={mediaType} />}

          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              {genre.name} {mediaType === "movie" ? "Movies" : "TV Shows"}
            </h2>

            <Carousel className="relative w-full">
              <CarouselContent>
                {itemsByGenre[genre.name] &&
                  itemsByGenre[genre.name]
                    .reduce((acc, item, index) => {
                      if (index % 5 === 0) acc.push([]);
                      acc[acc.length - 1].push(item);
                      return acc;
                    }, [])
                    .map((group, index) => (
                      <CarouselItem key={index} className="w-full">
                        <div className="flex space-x-4">
                          {group.map((item) => {
                            const isInWishlist = wishlist.some(
                              (movie) => movie.movie_id === item.id
                            );

                            return (
                              <div
                                key={item.id}
                                className="relative w-full h-[150px] cursor-pointer rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
                                onMouseEnter={() => setHoveredMovie(item.id)}
                                onMouseLeave={() => setHoveredMovie(null)}
                              >
                                <img
                                  src={`https://image.tmdb.org/t/p/w1280${item.backdrop_path}`}
                                  alt={item.title || item.name}
                                  className="w-[800px] h-[150px] object-cover rounded-lg transition-all duration-500 ease-in-out"
                                />

                                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-3">
                                  <h3 className="text-white text-base font-semibold">
                                    {item.title || item.name}
                                  </h3>
                                </div>

                                {hoveredMovie === item.id && (
                                  <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-90 text-white p-4 flex flex-col items-center rounded-lg shadow-lg transition-all duration-500 ease-in-out scale-100 opacity-0 hover:scale-110 hover:opacity-100 z-50">
                                    <div className="flex gap-2">
                                      {/* ✅ Play Trailer Button */}
                                      <Button
                                        variant="amazon"
                                        className="h-10 w-16 rounded-md"
                                        onClick={() => playTrailer(item.id)}
                                      >
                                        Play
                                      </Button>

                                      <Button
                                        variant="amazon"
                                        size="round_sm"
                                        onClick={() => addToWishlist(item)}
                                      >
                                        {isInWishlist ? (
                                          <FaCheck className="text-3xl text-green-500" />
                                        ) : (
                                          <FaPlus className="text-3xl" />
                                        )}
                                      </Button>

                                      {/* ✅ Navigate to Movie Details Page */}
                                      <Button
                                        variant="amazon"
                                        size="round_sm"
                                        onClick={() => goToMovieDetails(item.id)}
                                      >
                                        <IoMdInformationCircleOutline className="text-4xl" />
                                      </Button>
                                    </div>

                                    <p className="text-xs mt-1 text-center mx-4">
                                      {item.overview?.slice(0, 100)}
                                    </p>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </CarouselItem>
                    ))}
              </CarouselContent>

              <CarouselPrevious className="absolute left-2 z-20 top-1/2 bg-white p-2 rounded-full text-black hover:bg-gray-300 transition" />
              <CarouselNext className="absolute right-2 z-20 top-1/2 bg-white p-2 rounded-full text-black hover:bg-gray-300 transition" />
            </Carousel>
          </div>
        </React.Fragment>
      ))}

      {/* ✅ Reusable Trailer Modal */}
      <TrailerModal trailerKey={trailerKey} onClose={() => setTrailerKey(null)} />
    </div>
  );
};

export default GenreCarousel;
