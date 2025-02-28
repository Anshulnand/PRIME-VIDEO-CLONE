import React, { useEffect, useState } from "react";

import { FaPlus } from "react-icons/fa6";
import { IoMdInformationCircleOutline } from "react-icons/io";

import { Button } from "@/components/ui/button";
const Carousel_info = ({ apikeys, MovieList }) => {
  // ✅ Dependencies ensure correct updates

  return (
    <>
      <div className="flex-col mb-20">
        <div className="w-full flex justify-center"></div>
        <div className="flex items-center gap-6 mt-32 absolute left-6 top-[350px]">
          {/* Episode Button */}
          <div className="group">
            <Button className=" hover:bg-white  hover:text-black flex flex-col items-center justify-center w-40 h-20 text-xl font-semibold bg-gray-700 text-white rounded-lg h transition">
              <span>Episode 1</span>
              <span className="text-sm">Watch Now</span>
            </Button>
          </div>
          {/* Icons Container */}
          <div className="flex items-center gap-5">
            {/* Add to Watchlist Button */}
            <Button variant="amazon" size="round_md">
              <FaPlus className="text-3xl" />
            </Button>

            {/* Information Button */}
            <Button variant="amazon" size="round_md">
              <IoMdInformationCircleOutline size="4xl" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel_info;
