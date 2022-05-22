import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import SEO from '../components/SEO';
// import '../style/detail.css';

function Detail() {
  const {id} = useLocation().state;
  const [detailData, setDetailData] = useState();

  useEffect(() => {
    getDetailData();
  }, []);

  const getDetailData = async () => {
    try {
      const getData = await axios.get(`https://api.themoviedb.org/3/movie/675353?api_key=79d2203704bbe2e06a86e73b747c9053`);
      setDetailData(getData.data.results);
    }
    catch(e) {
      console.log('getDetailData error: ', e);
    }
  }

  console.log(detailData);

  return (
    <div>
      <SEO title="Detail" />
      <div className="container">
        <img src={id} />
        <h2>{id || "로딩중..."}</h2>
        <div className="basicInfo">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="borderBottom"></div>
        <div className="overview"></div>
      </div>
    </div>
  )
}

export default Detail