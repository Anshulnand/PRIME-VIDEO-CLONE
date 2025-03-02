import React from "react";
import { Button } from "@/components/ui/button";

const TrailerModal = ({ trailerKey, onClose }) => {
  if (!trailerKey) return null; // If no trailer, return nothing

  return (
    <div className="fixed inset-0 flex justify-center items-center h-full bg-black bg-opacity-50 backdrop-blur-lg z-50">
      <div className="relative w-[90%] md:w-[70%] lg:w-[50%] rounded-xl overflow-hidden bg-black shadow-xl border-4 border-gray-700">
        <iframe
          className="w-full h-[60vh] rounded-xl"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0&modestbranding=1`}
          title="YouTube video player"
          allowFullScreen
        ></iframe>

        {/* Close Button */}
        <Button
          onClick={onClose}
          className="absolute top-3 right-3 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-500 transition shadow-lg"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default TrailerModal;
