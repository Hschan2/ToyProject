import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import ToTop from '../components/ToTop';
import styles from '../style/listStyle.module.css';

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
      <div className={styles.container}>
        {topRatedData?.map((movie) => (
          <Link to={`/Detail/${movie.original_title}/${movie.id}`} state={{mTitle:movie.original_title, id:movie.id}} key={movie.id}>
            <div className={styles.movie} key={movie.id}>
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

export default HighRated