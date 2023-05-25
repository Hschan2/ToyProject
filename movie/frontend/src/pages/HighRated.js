import React, { useEffect, useState } from 'react'
import GetMovieList from '../components/GetMovieList';
import Loading from '../components/Loading';
import MovieLists from '../components/MovieLists';
import SEO from '../components/SEO';

/**
 * 영화 평점순 페이지 출력 컴포넌트
 * @topRatedData 영화 평점순 데이터 담을 변수
 */
function HighRated() {
  const [topRatedData, setTopRatedData] = useState();

  useEffect(() => {
    getTopRatedData();
  }, []);

  const getTopRatedData = GetMovieList('/api/highRated', setTopRatedData);

  return (
    <div>
      <SEO title="평점순" />
      {!topRatedData ? <Loading /> : <MovieLists movieList={topRatedData} />}
    </div>
  )
}

export default HighRated