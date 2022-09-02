import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import MovieLists from '../components/MovieLists';
import SEO from '../components/SEO';
import ToTop from '../components/ToTop';
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
  }, [upcomingData]);

  const getUpcomingData = GetMovieList('/api/upcoming', setUpcomingData);

  return (
    <div>
      <SEO title="개봉예정작" />
      {!upcomingData ? <Loading /> : <MovieLists movieList={upcomingData} />}
      <ToTop />
      <Footer />
    </div>
  )
}

export default Upcoming