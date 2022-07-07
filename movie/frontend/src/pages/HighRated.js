import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import GetMovieList from '../components/GetMovieList';
import Loading from '../components/Loading';
import MovieLists from '../components/MovieLists';
import SEO from '../components/SEO';
import ToTop from '../components/ToTop';

function HighRated() {
  const [topRatedData, setTopRatedData] = useState();

  useEffect(() => {
    getTopRatedData();
  }, [topRatedData]);

  const getTopRatedData = GetMovieList('/api/highRated', setTopRatedData);

  return (
    <div>
      <SEO title="평점순" />
      {!topRatedData ? <Loading /> : <MovieLists movieList={topRatedData} />}
      <Footer />
      <ToTop />
    </div>
  )
}

export default HighRated