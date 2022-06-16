import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import MovieLists from '../components/MovieLists';
import SEO from '../components/SEO';
import ToTop from '../components/ToTop';

function HighRated() {
  const [topRatedData, setTopRatedData] = useState();

  useEffect(() => {
    getTopRatedData();
  }, []);

  const getTopRatedData = async () => {
    try {
       const getData = await axios.get('/api/highRated');
       setTopRatedData(getData.data.results);
    }
    catch(e) {
       console.log('getTopRatedData error: ', e);
    }
  }

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