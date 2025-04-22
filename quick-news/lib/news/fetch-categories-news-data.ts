import { toast } from 'react-toastify'
import { useFetchNewsQuery } from '../news-api'

export default function useCategoriesNewsFetch(
  category: string,
  pageSize: number,
) {
  const { data: articles, isLoading, error } = useFetchNewsQuery(category)

  if (error) {
    toast.error('뉴스 데이터를 불러오지 못했습니다.')
    console.error('네이버 뉴스 데이터 불러오기 에러', error)
  }

  const visibleNews = articles?.slice(0, pageSize) || []

  return { visibleNews, isLoading }
}
