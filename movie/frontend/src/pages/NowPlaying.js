import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import ToTop from '../components/ToTop';
import MovieLists from '../components/MovieLists';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import GetMovieList from '../components/GetMovieList';

/**
 * 현재 개봉 영화 목록 출력 컴포넌트
 * @nowPlayingData 현재 개봉 목록 데이터 담을 변수
 */
function NowPlaying() {
  const [nowPlayingData, setNowPlayingData] = useState();

  useEffect(() => {
    getNowPlayingData();
  }, [nowPlayingData]);

  const getNowPlayingData = GetMovieList('/api/now_playing', setNowPlayingData);

  return (
    <div>
      <SEO title="현재개봉작" />
      {!nowPlayingData ? <Loading /> : <MovieLists movieList={nowPlayingData} />}
      <ToTop />
      <Footer />
    </div>
  )
}

export default NowPlaying;