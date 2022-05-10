import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SEO from '../components/SEO';
import ToTop from '../components/ToTop';
import '../style/listStyle.css';

function HighRated() {
  const [topRatedData, setTopRatedData] = useState();

  useEffect(() => {
    getTopRatedData();
  }, []);

  const getTopRatedData = async () => {
    try {
       const getData = await axios.get('/api/popular');
       setTopRatedData(getData.data.results);
    }
    catch(e) {
       console.log('getTopRatedData error: ', e);
    }
 }

  return (
    <div>
      <SEO title="TopRated" />
      <div className="container">
        {topRatedData?.map((movie) => (
          <div className="movie" key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
            <h4>
              <a>{movie.original_title}</a>
            </h4>
          </div>
        ))}
      </div>
      <ToTop />
    </div>
  )
}

export default HighRated