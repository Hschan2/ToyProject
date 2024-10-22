import { useCallback, useState } from 'react'
import { NaverNewsProps } from '../types/type'

export default function useAdditionNews(
  initialNews: NaverNewsProps[],
  pageSize: number,
) {
  const [currentPage, setCurrentPage] = useState(1)
  const [visibleNews, setVisibleNews] = useState(initialNews?.slice(0, pageSize))

  const loadMoreNews = useCallback(() => {
    const nextPage = currentPage + 1
    const nextNews = initialNews.slice(0, nextPage * pageSize)
    setVisibleNews(nextNews)
    setCurrentPage(nextPage)
  }, [currentPage, initialNews, pageSize])

  const hasMoreNews = visibleNews?.length < initialNews?.length

  return { visibleNews, loadMoreNews, hasMoreNews }
}
