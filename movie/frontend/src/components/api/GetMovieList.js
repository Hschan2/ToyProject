import axios from "axios"

/**
 * 영화 목록 데이터 Get 컴포넌트
 * @param {*} apiUrl API 주소 파라미터
 * @param {*} setData API에서 가져온 데이터를 담을 파라미터
 * @returns 
 */
async function GetMovieList(apiUrl) {
  try {
    const getData = await axios.get(apiUrl);
    return getData.data.results;
  }
  catch (e) {
    if (e) throw new Error(e.message);
    console.log(`MovieList `, e);
  }
}

export default GetMovieList