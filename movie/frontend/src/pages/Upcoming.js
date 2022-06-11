import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import MovieLists from '../components/MovieLists';
import SEO from '../components/SEO';
import ToTop from '../components/ToTop';
import Loading from '../components/Loading';

function Upcoming() {
  const [upcomingData, setUpcomingData] = useState();

  useEffect(() => {
    getUpcomingData();
  }, []);

  const getUpcomingData = async () => {
    try {
       const getData = await axios.get('/api/upcoming');
       setUpcomingData(getData.data.results);
    }
    catch(e) {
       console.log('getUpcomingData error: ', e);
    }
  }

  return (
    <div>
      <SEO title="개봉예정작" />
      {!upcomingData ? <Loading /> : <MovieLists movieList={upcomingData} />}
      <Footer />
      <ToTop />
    </div>
  )
}

export default Upcoming