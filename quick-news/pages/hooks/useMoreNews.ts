import { useEffect, useState } from 'react'
import { MAX_PAGE_COUNT } from '../../constants/CommonVariable'

export default function useMoreNews(initialPageSize = 20) {
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [isAllLoaded, setIsAllLoaded] = useState(false)

  const handleLoadMore = () => {
    setPageSize((prevPageSize) => prevPageSize + 10)
  }

  useEffect(() => {
    if (pageSize >= MAX_PAGE_COUNT) {
      setIsAllLoaded(true)
    } else {
      setIsAllLoaded(false)
    }
  }, [pageSize])

  return { pageSize, handleLoadMore, isAllLoaded }
}
