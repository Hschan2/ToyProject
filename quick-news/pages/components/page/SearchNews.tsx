import React, { Suspense, lazy, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { searchState } from '../../../constants/SearchTermState'
import useVisibility from '../../hooks/useVisibility'
import useMoreNews from '../../hooks/useMoreNews'
import MoreViewButton from '../btn/MoreViewButton'
import { MAX_PAGE_COUNT } from '../../../constants/CommonVariable'
import NaverNewsFetch from '../fetch/NaverNewsFetch'
import NewsItem from './NewsItem'

const Loading = lazy(() => import('./Loading'))

function SearchNews() {
  const { pageSize, handleLoadMore, isAllLoaded } = useMoreNews()
  const newsListRef = useRef<HTMLDivElement | null>(null)
  const isVisible = useVisibility(newsListRef)
  const searchTerm = useRecoilValue(searchState)
  const { visibleNews, isLoading } = NaverNewsFetch(pageSize, searchTerm)

  return (
    <Suspense fallback={<Loading />}>
      <div ref={newsListRef}>
        {visibleNews?.map((item) => isVisible && <NewsItem item={item} />)}
      </div>
      {!isAllLoaded && (
        <MoreViewButton
          onClick={handleLoadMore}
          disabled={isLoading || pageSize >= MAX_PAGE_COUNT}
        >
          더보기
        </MoreViewButton>
      )}
    </Suspense>
  )
}

export default SearchNews