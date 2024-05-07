import React, { useEffect, useState } from 'react'
import MovieLists from '../components/MovieLists';
import SEO from '../components/SEO';
import Loading from '../components/Loading';
import GetMovieList from '../components/GetMovieList';

/**
 * 영화 개봉예정작 출력 컴포넌트
 * @upcomingData 개봉예정작 영화 데이터 담을 변수
 */
function Upcoming() {
  const [upcomingData, setUpcomingData] = useState();

  useEffect(() => {
    getUpcomingData();
  }, []);

  const getUpcomingData = async () => {
    const getUpcomingLists = await GetMovieList('/upcoming');
    setUpcomingData(getUpcomingLists);
  }

  return (
    <div>
      <SEO title="개봉예정작" />
      {!upcomingData ? <Loading /> : <MovieLists movieList={upcomingData} />}
    </div>
  )
}

export default Upcoming