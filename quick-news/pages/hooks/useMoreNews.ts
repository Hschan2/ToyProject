import { useState } from 'react'

export default function useMoreNews(initialPageSize = 20) {
  const [pageSize, setPageSize] = useState(initialPageSize)

  const handleLoadMore = () => {
    setPageSize((prevPageSize) => prevPageSize + 10)
  }

  return { pageSize, handleLoadMore }
}
