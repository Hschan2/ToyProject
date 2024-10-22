import axios, { CancelTokenSource } from 'axios'
import { useQuery } from 'react-query'
import { MAX_PAGE_COUNT } from '../../utils/Constants'
import { NaverNewsLists, NaverNewsProps } from '../../types/type'

const fetchNews = async (
  queryValue: string,
  cancelToken: CancelTokenSource['token'],
): Promise<NaverNewsProps[]> => {
  const { data } = await axios.get<NaverNewsLists>('/api/naver-news-proxy', {
    params: {
      q: queryValue,
      pageCount: MAX_PAGE_COUNT,
    },
    cancelToken,
  })

  return data.items
}

export default function NaverNewsFetch(
  pageSize: number,
  queryValue = '오늘의주요뉴스',
) {
  const { data: news, isLoading } = useQuery(
    ['news', queryValue, pageSize],
    async ({ signal }) => {
      const source = axios.CancelToken.source()
      signal?.addEventListener('abort', () => {
        source.cancel('Query 요청 중단')
      })
      return fetchNews(queryValue, source.token)
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      cacheTime: 30 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
    },
  )

  const visibleNews = news?.slice(0, pageSize)

  return { visibleNews, isLoading }
}
