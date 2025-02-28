
import { moviePage } from '../data/Moviedata'
import Slider from "../MyComponent/Slider";
import GenreList from "../MyComponent/GenreList";


const MoviesPage = () => {
  return (
  <>
  <Slider trending="trendingmovies"></Slider>
  <GenreList movie={moviePage} tv={null}></GenreList>
  </>
  )
}

export default MoviesPage