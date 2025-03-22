  import GenreList from '@/MyComponent/GenreList'
  import Slider from '@/MyComponent/Slider'
  import React, { useEffect } from 'react'
  import { tvPage } from '@/data/Moviedata'
  const TvShowsPage = () => {
    useEffect(() => {
      window.scrollTo(0, 0); // ✅ Scrolls to the top when page loads
    }, []);
  
    return (
    <>
    <Slider trending="trendingtv"></Slider>
    <GenreList movie={null} tv={tvPage}></GenreList>
    </>
    )
  }

  export default TvShowsPage