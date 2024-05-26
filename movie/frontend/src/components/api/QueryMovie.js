import axios from 'axios';
import axiosRetry from 'axios-retry';
import React from 'react'

axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => {
    return axiosRetry.exponentialDelay(retryCount);
  },
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.response?.status >= 500;
  },
})

const QueryMovie = async (apiUrl) => {
  try {
    const response = await axios.get(apiUrl);
    return response.data.results;
  } catch (error) {
    console.error(`에러 발생: ${error}`);
    return [];
  }
}

export const QuerySearchMovie = async (query) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/movies/search?searchText=${query}`);
    return response.data.results;
  } catch (error) {
    console.error(`에러 발생: ${error}`);
    return [];
  }
}

export const QueryDetailMovie = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/movies/detail/${id}`);
    return response.data;
  } catch (error) {
    console.error(`에러 발생: ${error}`);
    return null;
  }
}

export default QueryMovie