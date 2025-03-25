import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { FaPlus, FaCheck, FaPlay } from "react-icons/fa6";
import { IoMdInformationCircleOutline } from "react-icons/io";
import TopRatedCarousel from "./TopRatedCarousel";
import { useWishlist } from "../Context/WishlistContext";
import TrailerModal from "./TrailerModal";

const GenreCarousel = ({ genres, mediaType }) => {
  if (!genres) return null;
  const [itemsByGenre, setItemsByGenre] = useState({});
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const { wishlist, addToWishlist } = useWishlist();
  const [trailerKey, setTrailerKey] = useState(null);
  const navigate = useNavigate();

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

  const handlePlayClick = (itemId) => {
    setTrailerKey(itemId);
  };

  const goToDetails = (itemId) => {
    navigate(`/${mediaType}/${itemId}`);
  };

  return (
    <div className="space-y-8">
      {genres.map((genre, genreIndex) => (
        <React.Fragment key={genre.id}>
          {genreIndex % 3 === 0 && (
            <TopRatedCarousel mediaType={mediaType} uniqueKey={genreIndex} />
          )}
                                                                                              
          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              {genre.name} {mediaType === "movie" ? "Movies" : "TV Shows"}
            </h2>

            <Carousel className="relative w-full">
              <CarouselContent>
                {itemsByGenre[genre.name]?.map((item) => {
                  const isInWishlist = wishlist.some(
                    (movie) => movie.movie_id === item.id
                  );

                  return (
                    <CarouselItem
                      key={item.id}
                      className="basis-full md:basis-1/4 p-2"
                    >
                      <div
                        className="relative w-full h-[200px] cursor-pointer rounded-lg overflow-hidden transition-all duration-500 ease-in-out group"
                        onMouseEnter={() => setHoveredMovie(item.id)}
                        onMouseLeave={() => setHoveredMovie(null)}
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w1280${item.backdrop_path}`}
                          alt={item.title || item.name}
                          className="w-full h-full object-cover rounded-lg transition-all duration-500 ease-in-out group-hover:brightness-50"
                        />  

                        {/* Hover overlay */}
                        {hoveredMovie === item.id && (
                          <div
                            className="absolute inset-0 flex items-center justify-center gap-2 hover:transition-all hover:ease-in-out hover:duration-150"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {/* Play button (visible on all screens) */}
                            <Button
                              variant="amazon"
                              size="Genre"
                              onClick={() => handlePlayClick(item.id)}
                            >
                              <FaPlay className="h-4 w-4" />
                            </Button>

                            {/* Wishlist button (hidden on mobile) */}
                            <Button
                              variant="amazon"
                              size="round_md"
                              className="hidden md:inline-flex"
                              onClick={() =>
                                addToWishlist({ movie_id: item.id, ...item })
                              }
                            >
                              {isInWishlist ? (
                                <FaCheck className="h-4 w-4" />
                              ) : (
                                <FaPlus className="h-4 w-4" />
                              )}
                            </Button>

                            {/* Info button (visible on all screens) */}
                            <Button
                              variant="amazon"
                              size="round_md"
                              onClick={() => goToDetails(item.id)}
                            >
                              <IoMdInformationCircleOutline className="h-6 w-6" />
                            </Button>
                          </div>
                        )}

                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-3">
                          <h3 className="text-white text-base font-semibold">
                            {item.title || item.name}
                          </h3>
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>

              <CarouselPrevious className="absolute left-2 z-20 top-1/2 bg-white p-2 rounded-full text-black hover:bg-gray-300 transition" />
              <CarouselNext className="absolute right-2 z-20 top-1/2 bg-white p-2 rounded-full text-black hover:bg-gray-300 transition" />
            </Carousel>
          </div>
        </React.Fragment>
      ))}

      <TrailerModal
        trailerKey={trailerKey}
        onClose={() => setTrailerKey(null)}
      />
    </div>
  );
};

export default GenreCarousel;