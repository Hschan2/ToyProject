import { useQuery } from 'react-query'
import axios from 'axios'
import { toast } from 'react-toastify'
import { BasicNewsProps } from '../../types/type'

const fetchCategoryNews = async (
  category: string,
): Promise<BasicNewsProps[]> => {
  const { data } = await axios.get(
    `/api/naver-category-news?category=${category}`,
  )
  return data
}

export default function useCategoriesNewsFetch(
  category: string,
  pageSize: number,
) {
  const {
    data: articles,
    isLoading,
    error,
  } = useQuery(['categoryNews', category], () => fetchCategoryNews(category), {
    refetchOnWindowFocus: false,
    cacheTime: 30 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  })

  if (error) {
    toast.error('뉴스 데이터를 불러오지 못했습니다.')
    console.error('카테고리 뉴스 데이터 불러오기 에러', error)
  }

  const visibleNews = articles?.slice(0, pageSize) || []

  return { visibleNews, isLoading, articles }
}
