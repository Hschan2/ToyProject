import axios from 'axios';
import React from 'react'

const QueryMovie = async (apiUrl) => {
  try {
      const response = await axios.get(apiUrl);
      return response.data.results;
  } catch (error) {
      throw new Error(`에러 발생: ${error}`);
  }
}

export default QueryMovie