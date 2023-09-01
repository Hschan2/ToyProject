import axios from 'axios'
import { useQuery } from 'react-query'
import { MAX_PAGE_COUNT } from '../../../constants/CommonVariable'
import { NewsData } from '../../../interfaces/Interfaces'

export default function NaverNewsFetch(
  pageSize: number,
  queryValue = '오늘의주요뉴스',
) {
  const fetchNews = async () => {
    const { data } = await axios.get<NewsData>('/api/naver-news-proxy', {
      params: {
        q: queryValue,
        pageCount: MAX_PAGE_COUNT,
      },
    })

    return data.items
  }

  const { data: news, isLoading } = useQuery('news', fetchNews, {
    refetchOnWindowFocus: false,
  })

  const visibleNews = news?.slice(0, pageSize)

  return { visibleNews, isLoading }
}
