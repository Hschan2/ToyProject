import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
          <Link to={`/Detail/${movie.id}`} state={{id:movie.id}} key={movie.id}>
            <div className="movie">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
              <h4>
                {movie.original_title}
              </h4>
            </div>
          </Link>
        ))}
      </div>
      <ToTop />
    </div>
  )
}

export default Popular;