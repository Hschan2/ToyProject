import React from 'react'
import { Link } from 'react-router-dom';
import styles from '../style/listStyle.module.css';

function MovieLists({ movieList }) {
  return (
    <div className={styles.container}>
        {movieList?.map((movie) => (
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
  )
}

export default MovieLists