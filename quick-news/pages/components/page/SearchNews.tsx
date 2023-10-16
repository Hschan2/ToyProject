import React, { Suspense, lazy, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import useVisibility from '../../hooks/useVisibility'
import useMoreNews from '../../hooks/useMoreNews'
import NaverNewsFetch from '../fetch/NaverNewsFetch'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import { LoadingContainer } from '../../../styles/LoadingStyle'

const Loading = lazy(() => import('./Loading'))
const NewsItem = lazy(() => import('./NewsItem'))

export default function SearchNews() {
  const { pageSize, handleLoadMore, isAllLoaded } = useMoreNews()
  const newsListRef = useRef<HTMLDivElement | null>(null)
  const isVisible = useVisibility(newsListRef)
  const searchParams = useSearchParams()
  const searchedValue = searchParams.get('q') || ''
  const { visibleNews, isLoading } = NaverNewsFetch(pageSize, searchedValue)

  useInfiniteScroll({ handleLoadMore, isAllLoaded })

  return (
    <Suspense fallback={<Loading />}>
      <div ref={newsListRef}>
        {visibleNews?.map(
          (item) => isVisible && <NewsItem key={item.id} item={item} />,
        )}
      </div>
      {!isLoading ? '' : <LoadingContainer>📰불러오는 중...</LoadingContainer>}
    </Suspense>
  )
}
