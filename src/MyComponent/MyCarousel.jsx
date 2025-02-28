import React, { useEffect, useRef, useState } from "react";
import Flickity from "flickity";
import "flickity/css/flickity.css";
import { movieBaseUrl } from "../Services/GlobalApi";

const MyCarousel = ({ MovieList }) => {
  console.log(MovieList);
  const flickityRef = useRef(null);
  const [flickityReady, setFlickityReady] = useState(false);
  let flickityInstance = useRef(null);

  useEffect(() => {
    if (flickityRef.current && MovieList.length > 0) {
      flickityInstance.current = new Flickity(flickityRef.current, {
        wrapAround: true,
        autoPlay: 3000,
        pauseAutoPlayOnHover: true,
        contain: true,
        prevNextButtons: true,
        pageDots: true, // ✅ Ensure page dots are enabled
        draggable: true,
        cellAlign: "center",
        selectedAttraction: 0.01,
        friction: 0.15,
        freeScroll: false,
        adaptiveHeight: true,
      });

      setFlickityReady(true);
    }

    return () => {
      if (flickityInstance.current) {
        flickityInstance.current.destroy();
      }
    };
  }, [MovieList]);

  return (
    <div className="relative w-full  mx-auto overflow-hidden">
      {/* ✅ Show loading text until Flickity is ready */}
      {!flickityReady && <p className="text-white text-center">Loading...</p>}

      <div ref={flickityRef} className={`carousel ${!flickityReady ? "hidden" : ""}`}>
        {MovieList.length > 0 ? (
          MovieList.map((item, index) => (
            <div key={index} className="carousel-cell w-full h-[600px] flex items-center justify-center">
              <div
                className="relative w-full h-full bg-cover bg-center rounded-lg"
                style={{ backgroundImage: `url(${movieBaseUrl}${item.backdrop_path})` }}
              >
                <div className="absolute bottom-32 left-0 w-full p-5 rounded-b-lg">
                  <h2 className="text-white text-xl font-semibold">{item.title || "Movie"}</h2>
                  <p className="text-white text-sm">{item.overview?.slice(0, 100)}...</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="carousel-cell text-white text-center">No Movies Found</div>
        )}
      </div>

      {/* ✅ Force Page Dots to be visible */}
      <style>
        {`
          .flickity-page-dots {
            bottom: 10px;
          }
          .flickity-page-dots .dot {
            background: white;
            width: 10px;
            height: 10px;
          }
        `}
      </style>
    </div>
  );
};

export default MyCarousel;
