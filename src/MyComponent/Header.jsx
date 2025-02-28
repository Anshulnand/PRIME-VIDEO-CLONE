import React, { useState } from "react";
import { Link } from "react-router-dom";
import { menu1, menu2 } from "../data/Moviedata";
import SearchBar from "./SearchBar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [activetab, setactivetab] = useState("Home")

const handleactivetab=(name)=>
   {
    setactivetab(name);
   }

  const handleClick = (action) => {
    if (action === "search") {
      setShowSearch(true); // ✅ Open Search Bar
    } else if (action === "download") {
      alert("Downloading..."); // ✅ Example Download Action
    } else if (action === "menu") {
      setShowMenu(!showMenu); // ✅ Toggle Menu
    } else if (action === "bookmark") {
      console.log("Bookmark Clicked!"); // ✅ Bookmark Action
    } else if (action === "settings") {
      console.log("Opening Settings..."); // ✅ Open Settings
    }
  };

  return (
    <>
      <div className="bg-slate-800 bg-opacity-90 fixed w-full backdrop-blur-sm z-50 text-white font-semibold">
        <div className="flex justify-between px-8 items-center py-4">
          {/* Logo & Navigation */}
          <div className="flex gap-6 items-center">
            <div className="text-xl font-bold">Prime Video</div>

            <div className="flex gap-4">
              {/* Navigation Links */}
              <div className="flex gap-2">
                {menu1.map((item, index) => (
                  <Link
                  onClick={()=>handleactivetab(item.name)}
                    key={index}
                    to={item.path}
                    className={`relative px-4 py-2 ${activetab==item.name?"bg-gray-700":""}  cursor-pointer transition duration-300 hover:bg-white hover:text-black rounded-md`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Icons & CLERK */}
          <div className="flex gap-6 items-center">
            {/* Icons */}
            <div className="flex gap-4 text-xl font-bold">
              {menu2.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger
                          key={index}
                          onClick={() => handleClick(item.action)}
                          className="p-2 rounded-full cursor-pointer hover:bg-white hover:text-black transition duration-300"
                        >
                          <IconComponent />
                        </TooltipTrigger>
                        <TooltipContent className="bg-slate-800">
                          <p> {item.action} </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </>
                );
              })}
            </div>

            {/* Clerk Section */}
            <div className="text-white font-semibold px-4 py-2 bg-gray-800 rounded-md hover:bg-gray-600 transition">
              CLERK
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Full-screen Black Background When Search is Open */}
      {showSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50">
          <SearchBar onClose={() => setShowSearch(false)} />
        </div>
      )}
    </>
  );
};

export default Header;
