import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import MovieLists from '../components/MovieLists';
import Loading from '../components/Loading';
import GetMovieList from '../components/GetMovieList';

/**
 * 인기 영화 목록 출력 컴포넌트
 * @popularData 인기 영화 목록 데이터 담을 변수
 */
function Popular() {
  const [popularData, setPopularData] = useState();
  
  useEffect(() => {
    getPopularData();
  }, []);

  const getPopularData = async () => {
    const getPopularLists = await GetMovieList('/popular');
    setPopularData(getPopularLists);
  }

  return (
    <div>
      <SEO title="인기순" />
      {!popularData ? <Loading /> : <MovieLists movieList={popularData} />}
    </div>
  )
}

export default Popular;