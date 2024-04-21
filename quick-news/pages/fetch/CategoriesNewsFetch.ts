import { toast } from 'react-toastify'
import { useFetchNewsQuery } from '../api/CreateApi'

export default function CategoriesNewsFetch(
  category: string | undefined,
  pageSize: number,
) {
  const { data: articles, isLoading, error } = useFetchNewsQuery(category)

  if (error) {
    toast.error('뉴스 데이터를 불러오지 못했습니다.')
    console.error(error)
  }

  const visibleNews = articles?.articles.slice(0, pageSize)

  return { visibleNews, isLoading }
}
