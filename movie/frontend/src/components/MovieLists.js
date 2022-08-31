import React from 'react'
import { Link } from 'react-router-dom';
import styles from '../style/listStyle.module.css';

/**
 * 영화 목록 출력 페이지 컴포넌트
 * @movieList 영화 목록들이 담긴 파라미터
 * @returns 영화 목록들이 담긴 파라미터의 길이만큼 반복해서 출력
 */
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