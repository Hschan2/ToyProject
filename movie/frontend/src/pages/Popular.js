import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SEO from '../components/SEO';
import ToTop from '../components/ToTop';
import styles from '../style/listStyle.module.css';
import Footer from '../components/Footer';

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
      <div className={styles.container}>
        {popularData?.map((movie) => (
          <Link to={`/Detail/${movie.original_title}/${movie.id}`} state={{mTitle:movie.original_title, id:movie.id}} key={movie.id}>
            <div className={styles.movie}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
              <h4>
                {movie.title}
              </h4>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
      <ToTop />
    </div>
  )
}

export default Popular;