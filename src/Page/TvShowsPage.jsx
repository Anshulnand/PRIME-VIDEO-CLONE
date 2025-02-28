import GenreList from '@/MyComponent/GenreList'
import Slider from '@/MyComponent/Slider'
import React from 'react'
import { tvPage } from '@/data/Moviedata'
const MoviesPage = () => {
  return (
  <>
  <Slider trending="trendingtv"></Slider>
  <GenreList movie={null} tv={tvPage}></GenreList>
  </>
  )
}

export default MoviesPage