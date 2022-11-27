import React, { useEffect, useState, useTransition } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import GetMovieDetail from '../components/GetMovieDetail';
import Loading from '../components/Loading';
import SEO from '../components/SEO';
import styles from '../style/detail.module.css';

/**
 * 상세 페이지 출력 컴포넌트
 * @startTransition 상태 변화의 지연을 위한 함수
 * @id URL 파라미터로 넘어온 Id 값
 * @detailData 영화 상세 데이터 담을 변수
 */
function Detail() {
  const [isPending, startTransition] = useTransition();
  const {mTitle, id} = useLocation().state;
  const [detailData, setDetailData] = useState();
  const {title, poster_path, overview, genres, production_companies, runtime, vote_average} = detailData || [];
  
  console.log(mTitle, id);

  const genreText = genres?.map((genre) => {
    return genre.name;
  })
  const productCompanyText = production_companies?.map((pc) => {
    return pc.name;
  });


  useEffect(() => {
    startTransition(() => {
      getDetailData();
    })
  }, []);

  const getDetailData = GetMovieDetail(`/api/detail/${id}`, setDetailData)

  return (
    <div>
      <SEO title={`${title}`} />
      {!detailData ? <Loading /> : (
        <div className={styles.container}>
          <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} className={styles.img} alt={`${title}`} />
          <h2>{title || "로딩중..."}</h2>
          <div className={styles.basicInfo}>
            <div>{productCompanyText?.join(', ')}</div>
            <div>{genreText?.join(', ')}</div>
            <div>{runtime} 분</div>
            <div>({vote_average?.toFixed(1)}점 / 10점)</div>
          </div>
          <div className={styles.borderBottom}></div>
          <div className={styles.overview}>{overview}</div>
        </div>
      )}
      <Footer />
    </div>
  )
}

export default Detail