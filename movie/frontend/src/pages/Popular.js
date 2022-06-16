import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SEO from '../components/SEO';
import ToTop from '../components/ToTop';
import MovieLists from '../components/MovieLists';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

function Popular() {
  const [popularData, setPopularData] = useState();

  useEffect(() => {
    getPopularData();
  }, []);

  const getPopularData = async () => {
    try {
      const getData = await axios.get('/api/popular');
      setPopularData(getData.data.results);
    }
    catch(e) {
      console.log('getPopularData error: ', e);
    }
  }

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