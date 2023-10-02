import { useEffect } from 'react'
import axios from 'axios'
import { useQuery, useQueryClient } from 'react-query'
import { MAX_PAGE_COUNT } from '../../../constants/CommonVariable'
import { NaverNewsLists } from '../../../interfaces/Interfaces'

export default function NaverNewsFetch(
  pageSize: number,
  queryValue = '오늘의주요뉴스',
) {
  const queryClient = useQueryClient()

  const fetchNews = async () => {
    const { data } = await axios.get<NaverNewsLists>('/api/naver-news-proxy', {
      params: {
        q: queryValue,
        pageCount: MAX_PAGE_COUNT,
      },
    })

    return data.items
  }

  const { data: news, isLoading } = useQuery(['news', queryValue], fetchNews, {
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (news) {
      queryClient.setQueryData(['news', queryValue], news)
    }
  }, [queryValue, news, queryClient])

  const visibleNews = news?.slice(0, pageSize)

  return { visibleNews, isLoading }
}
