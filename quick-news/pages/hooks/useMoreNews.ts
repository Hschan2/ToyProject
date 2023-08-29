import { useState } from 'react'

export default function useMoreNews(initialPageSize = 20) {
  const [pageSize, setPageSize] = useState(initialPageSize)

  const handleLoadMore = () => {
    setPageSize((prevPageSize) => {
      const newPageSize = prevPageSize < 40 ? prevPageSize + 10 : 20
      return newPageSize
    })
  }

  return { pageSize, handleLoadMore }
}
