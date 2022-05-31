import axios from 'axios';
import React, { useEffect, useState, useTransition } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import styles from '../style/detail.module.css';

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

  const getDetailData = async () => {
    try {
      const getData = await axios.get(`/api/detail/${id}`);
      setDetailData(getData.data);
    }
    catch(e) {
      console.log('getDetailData error: ', e);
    }
  }

  return (
    <div>
      <SEO title={`${title}`} />
        <div className={styles.container}>
          {!detailData ? '로딩중...' : (
            <>
              <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} className={styles.img} />
              <h2>{title || "로딩중..."}</h2>
              <div className={styles.basicInfo}>
                <div>{productCompanyText?.join(', ')}</div>
                <div>{genreText?.join(', ')}</div>
                <div>{runtime} 분</div>
                <div>({vote_average}점 / 10점)</div>
              </div>
              <div className={styles.borderBottom}></div>
              <div className={styles.overview}>{overview}</div>
            </>
          )}
        </div>
        <Footer />
    </div>
  )
}

export default Detail