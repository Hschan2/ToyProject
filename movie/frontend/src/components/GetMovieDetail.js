import axios from "axios"

function GetMovieDetail(apiUrl, setData) {

  return async () => {
    try {
      const getData = await axios.get(apiUrl);
      setData(getData.data);
    }
    catch(e) {
      console.log(`GetMovieDetail error: ` , e);
    }
  }
}

export default GetMovieDetail