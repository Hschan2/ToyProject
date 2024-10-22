import { useCallback, useState } from 'react'
import { MAX_PAGE_COUNT } from '../utils/Constants'

export default function useMoreNews(initialPageSize = 10) {
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [isAllLoaded, setIsAllLoaded] = useState(false)

  const handleLoadMore = useCallback(() => {
    if (pageSize < MAX_PAGE_COUNT) {
      setPageSize((prevPageSize) => prevPageSize + 10)
    } else {
      setIsAllLoaded(true)
    }
  }, [pageSize])

  return { pageSize, handleLoadMore, isAllLoaded }
}
