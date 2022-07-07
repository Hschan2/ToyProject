import axios from "axios"

function GetMovieList(apiUrl, setData) {

  return async () => {
    try {
      const getData = await axios.get(apiUrl);
      setData(getData.data.results);
    }
    catch(e) {
      console.log(`${setData} error: ` , e);
    }
  }
}

export default GetMovieList