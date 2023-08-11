import axios from "axios"

/**
 * 영화 상세 데이터 Get 컴포넌트
 * @param {*} apiUrl API 주소 파라미터
 * @param {*} setData API에서 가져온 데이터를 담을 파라미터
 * @returns 
 */
async function GetMovieDetail(apiUrl) {
  try {
    const getData = await axios.get(apiUrl);
    return getData.data;
  }
  catch (e) {
    console.log(`getMovieDetail `, e);
    return;
  }
}

export default GetMovieDetail