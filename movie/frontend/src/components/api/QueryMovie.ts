import axios from "axios";
import axiosRetry from "axios-retry";
import {
  MovieCarouselItemProps,
  MovieDetailProps,
  MovieItemProps,
} from "../types/MovieTypes";

axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => {
    return axiosRetry.exponentialDelay(retryCount);
  },
  retryCondition: (error) => {
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      (error.response?.status ?? 0) >= 500
    );
  },
});

/**
 *
 * @param {*} apiUrl 카테고리 API URL
 * @returns 카테고리 별 영화 데이터(배열/객체)
 */
const QueryMovie = async (
  apiUrl: string
): Promise<MovieCarouselItemProps[]> => {
  try {
    const response = await axios.get(apiUrl);
    return response.data.results;
  } catch (error) {
    console.error(`에러 발생: ${error}`);
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 404 || status === 500) {
        throw {
          status,
          message: error.response?.statusText || "No Error Status Message",
          errorMessage: error.response?.data?.message || "No Error Message",
        };
      }
    }

    return [];
  }
};

/**
 * @param {*} query 검색 단어
 * @returns 검색 단어에 맞는 영화 데이터(배열/객체)
 */
export const QuerySearchMovie = async (
  query: string | null
): Promise<MovieItemProps[]> => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/movies/search?searchText=${query}`
    );
    return response.data.results;
  } catch (error) {
    console.error(`에러 발생: ${error}`);
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 404 || status === 500) {
        throw {
          status,
          message: error.response?.statusText || "No Error Status Message",
          errorMessage: error.response?.data?.message || "No Error Message",
        };
      }
    }

    return [];
  }
};

/**
 * @param {*} id 영화 ID
 * @returns 해당 ID에 맞는 영화 데이터(객체)
 */
export const QueryDetailMovie = async (
  id: string | undefined
): Promise<MovieDetailProps> => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/movies/detail/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`에러 발생: ${error}`);
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 404 || status === 500) {
        throw {
          status,
          message: error.response?.statusText || "No Error Status Message",
          errorMessage: error.response?.data?.message || "No Error Message",
        };
      }
    }

    throw null;
  }
};

export default QueryMovie;
