import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SEO from '../components/SEO';
import ToTop from '../components/ToTop';
import '../style/listStyle.css';

function HighRated() {
  const [topRatedData, setTopRatedData] = useState([]);

  useEffect(() => {
      (async () => {
        const getMovies = await axios.get('/api/highRated');

        setTopRatedData(getMovies.data.results);
      })();
  }, []);

  console.log(topRatedData);

  return (
    <div>
      <div className="container">
        <SEO title="TopRated" />
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