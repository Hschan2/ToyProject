import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SEO from '../components/SEO';
import ToTop from '../components/ToTop';
import '../style/listStyle.css';

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
      <SEO title="Popular" />
      <div className="container">
        {popularData?.map((movie) => (
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

export default Popular;