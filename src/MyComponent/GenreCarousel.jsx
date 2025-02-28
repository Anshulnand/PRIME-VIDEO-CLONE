import React, { useEffect, useState } from "react";
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
import { FaPlus } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import TopRatedCarousel from "./TopRatedCarousel";

const GenreCarousel = ({ genres, mediaType }) => {
  if (!genres) return;
  const [itemsByGenre, setItemsByGenre] = useState({});
  const [hoveredMovie, setHoveredMovie] = useState(null);

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

  return (
    <div className="space-y-8">
      {genres.map((genre, genreIndex) => (
        <React.Fragment key={genre.id}>
          {/* ✅ Inject `TopRatedCarousel` Every 3rd Genre Section */}
          {genreIndex % 3 === 0 && <TopRatedCarousel mediaType={mediaType} />}

          {/* ✅ Genre Section */}
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
                          {group.map((item) => (
                            <div
                              key={item.id}
                              className="relative w-full h-[150px] cursor-pointer rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
                              onMouseEnter={() => setHoveredMovie(item.id)}
                              onMouseLeave={() => setHoveredMovie(null)}
                            >
                              {/* ✅ Movie Image */}
                              <img
                                src={`https://image.tmdb.org/t/p/w1280${item.backdrop_path}`}
                                alt={item.title || item.name}
                                className="w-[800px] h-[150px] object-cover rounded-lg transition-all duration-500 ease-in-out"
                              />

                              {/* ✅ Overlay for Readability */}
                              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-3">
                                <h3 className="text-white text-base font-semibold">
                                  {item.title || item.name}
                                </h3>
                              </div>

                              {/* ✅ Hover Card */}
                              {hoveredMovie === item.id && (
                                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-90 text-white p-4 flex flex-col items-center rounded-lg shadow-lg transition-all duration-500 ease-in-out scale-100 opacity-0 hover:scale-110 hover:opacity-100 z-50">
                                  <div className="flex gap-2">
                                    <Button
                                      variant="amazon"
                                      size="rounded_sm"
                                      className="h-10 w-16 rounded-md"
                                    >
                                      Play
                                    </Button>
                                    <Button
                                      variant="amazon"
                                      size="rounded_sm"
                                      className="h-10 w-10 rounded-full"
                                    >
                                      <FaPlus className="text-3xl" />
                                    </Button>
                                    <Button
                                      variant="amazon"
                                      size="rounded_md"
                                      className="h-10 w-10 rounded-full"
                                    >
                                      <IoMdInformationCircleOutline size="4xl" />
                                    </Button>
                                  </div>

                                  <p className="text-xs mt-1 text-center mx-4">
                                    {item.overview?.slice(0, 100)}
                                  </p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </CarouselItem>
                    ))}
              </CarouselContent>

              {/* ✅ Navigation Buttons */}
              <CarouselPrevious className="absolute left-2 z-20 top-1/2 bg-white p-2 rounded-full text-black hover:bg-gray-300 transition" />
              <CarouselNext className="absolute right-2 z-20 top-1/2 bg-white p-2 rounded-full text-black hover:bg-gray-300 transition" />
            </Carousel>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default GenreCarousel;
