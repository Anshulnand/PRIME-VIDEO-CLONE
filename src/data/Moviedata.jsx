import { IoIosSearch } from "react-icons/io";
import { GoDownload } from "react-icons/go";
import { PiDotsNineBold } from "react-icons/pi";
import { FaRegBookmark } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";

const movieGenres = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 14, name: "Fantasy" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romance" },
  { id: 53, name: "Thriller" },
];
const moviePage = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];



const tvGenres = [
  { id: 10751, name: "Family" },
  { id: 18, name: "Drama" },
  { id: 16, name: "Animation" }, 
];

const tvPage = [
  { id: 10759, name: "Action & Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 10762, name: "Kids" },
  { id: 9648, name: "Mystery" },
  { id: 10763, name: "News" },
  { id: 10764, name: "Reality" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 10766, name: "Soap" },
  { id: 10767, name: "Talk" },
  { id: 10768, name: "War & Politics" },
  { id: 37, name: "Western" }
];


const menu1 = [
  { name: "Home", path: "/Home" },
  { name: "Movies", path: "/Movies" },
  { name: "TV Shows", path: "/tv-shows" },
];
const menu2 = [
  { icon: IoIosSearch, action:"search" },
  { icon: GoDownload, action:"download" },
  { icon: PiDotsNineBold, action:"menu" },
  { icon: FaRegBookmark, action:"bookmark" },
  { icon: IoIosSettings, action:"setting" },
];
export { movieGenres, tvGenres, menu1, menu2, moviePage,tvPage };
