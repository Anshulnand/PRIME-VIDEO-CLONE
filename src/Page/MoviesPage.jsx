
import { moviePage } from '../data/Moviedata'
import Slider from "../MyComponent/Slider";
import GenreList from "../MyComponent/GenreList";
import { useEffect } from 'react';


const MoviesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // ✅ Scrolls to the top when page loads
  }, []);

  return (
  <>
  <Slider trending="trendingmovies"></Slider>
  <GenreList movie={moviePage} tv={null}></GenreList>
  </>
  )
}

export default MoviesPage