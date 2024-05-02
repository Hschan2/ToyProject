import React, { useEffect, useState, useTransition } from 'react';
import { useLocation } from 'react-router-dom';
import GetMovieDetail from '../components/GetMovieDetail';
import Loading from '../components/Loading';
import SEO from '../components/SEO';
import styles from '../style/detail.module.css';
import { ContainerUnderLine, DetailContainer, DetailImage, DetailInfoContainer, DetailOverview } from '../style/DetailPage';

/**
 * 상세 페이지 출력 컴포넌트
 * @startTransition 상태 변화의 지연을 위한 함수
 * @id URL 파라미터로 넘어온 Id 값
 * @detailData 영화 상세 데이터 담을 변수
 */
function Detail() {
  const [isPending, startTransition] = useTransition();
  const { mTitle, id } = useLocation().state;
  const [detailData, setDetailData] = useState();
  const { title, poster_path, overview, genres, production_companies, runtime, vote_average } = detailData || [];

  const genreText = genres?.map((genre) => genre.name);
  const productCompanyText = production_companies?.map((pc) => pc.name);

  useEffect(() => {
    startTransition(() => {
      getDetailData();
    })
  }, []);

  const getDetailData = async () => {
    try {
      const getData = await GetMovieDetail(`/api/detail/${id}`);
      setDetailData(getData);
    } catch (err) {
      console.log(`${GetMovieDetail} Error: `, err);
    }

  };

  return (
    <div>
      <SEO title={`${title}`} />
      {!detailData ? (
        <Loading />
      ) : (
        <DetailContainer>
          <DetailImage src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={`${title}`} />
          <h2>{title || "로딩중..."}</h2>
          <DetailInfoContainer>
            <p>{productCompanyText?.join(', ')}</p>
            <p>{genreText?.join(', ')}</p>
            <p>{runtime} 분</p>
            <p>({vote_average?.toFixed(1)}점 / 10점)</p>
          </DetailInfoContainer>
          <ContainerUnderLine />
          <DetailOverview>{overview}</DetailOverview>
        </DetailContainer>
      )}
    </div>
  )
}

export default Detail