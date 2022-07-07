import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import ToTop from '../components/ToTop';
import MovieLists from '../components/MovieLists';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import GetMovieList from '../components/GetMovieList';

function Popular() {
  const [popularData, setPopularData] = useState();

  useEffect(() => {
    getPopularData();
  }, [popularData]);

  const getPopularData = GetMovieList('/api/popular', setPopularData);

  return (
    <div>
      <SEO title="인기순" />
      {!popularData ? <Loading /> : <MovieLists movieList={popularData} />}
      <Footer />
      <ToTop />
    </div>
  )
}

export default Popular;