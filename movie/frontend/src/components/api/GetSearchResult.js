import axios from "axios"

/**
 * 영화 검색 결과 데이터 Get 컴포넌트
 * @param apiUrl API 주소 파라미터
 * @param setData API에서 가져온 데이터를 담을 파라미터
 * @param Text 검색을 위한 입력값
 * @returns 
 */
async function GetSearchResult(apiUrl, setData, searchText) {
  try {
    const getData = await axios.get(apiUrl, {
      params: { searchText: searchText },
    });
    setData(getData.data.results);
  }
  catch (e) {
    console.log(`${setData} error: `, e);
  }
}

export default GetSearchResult