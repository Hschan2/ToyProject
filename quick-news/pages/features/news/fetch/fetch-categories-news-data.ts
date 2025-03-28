import { toast } from 'react-toastify'
import { useFetchNewsQuery } from '../../../common/api/news-api'

export default function CategoriesNewsFetch(
  category: string | undefined,
  pageSize: number,
) {
  const { data: articles, isLoading, error } = useFetchNewsQuery(category)

  if (error) {
    toast.error('뉴스 데이터를 불러오지 못했습니다.')
    if (process.env.NODE_ENV !== 'production') {
      console.error('네이버 뉴스 데이터 불러오기 에러', error)
    }
  }

  const visibleNews = articles?.articles.slice(0, pageSize)

  return { visibleNews, isLoading }
}
