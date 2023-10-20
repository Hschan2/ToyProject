import { useEffect } from 'react'
import axios from 'axios'
import { useQuery, useQueryClient } from 'react-query'
import { MAX_PAGE_COUNT } from '../../../constants/CommonVariable'
import { NaverNewsLists, NaverNewsProps } from '../../../interfaces/Interfaces'

const fetchNews = async (queryValue: string): Promise<NaverNewsProps[]> => {
  const { data } = await axios.get<NaverNewsLists>('/api/naver-news-proxy', {
    params: {
      q: queryValue,
      pageCount: MAX_PAGE_COUNT,
    },
  })

  return data.items
}

export default function NaverNewsFetch(
  pageSize: number,
  queryValue = '오늘의주요뉴스',
) {
  const queryClient = useQueryClient()

  const { data: news, isLoading } = useQuery(
    ['news', queryValue],
    async () => fetchNews(queryValue),
    {
      refetchOnWindowFocus: false,
      cacheTime: 30 * 60 * 1000,
    },
  )

  useEffect(() => {
    if (news) {
      queryClient.setQueryData(['news', queryValue], news)
    }
  }, [queryValue, news, queryClient])

  const visibleNews = news?.slice(0, pageSize)

  return { visibleNews, isLoading }
}
