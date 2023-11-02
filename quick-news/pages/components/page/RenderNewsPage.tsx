import React, { Suspense, lazy, useCallback, useRef } from 'react'
import useVisibility from '../../hooks/useVisibility'
import { LoadingContainer } from '../../../styles/LoadingStyle'
import { CommonNewsListProps } from '../../../interfaces/Interfaces'
import Skeleton from './Skeleton'

const Loading = lazy(() => import('./Loading'))

export default function RenderNewsPage<T>(props: CommonNewsListProps<T>) {
  const { visibleNews, isLoading, itemRenderer } = props
  const newsListRef = useRef<HTMLDivElement | null>(null)
  const isVisible = useVisibility(newsListRef)

  const memoizedItemRenderer = useCallback(
    (item: T) => itemRenderer(item),
    [itemRenderer],
  )

  return (
    <Suspense fallback={<Loading />}>
      <div ref={newsListRef}>
        {visibleNews?.map((item) => isVisible && memoizedItemRenderer(item))}
      </div>
      {!isLoading ? (
        ''
      ) : (
        // <LoadingContainer>📰뉴스 불러오는 중...</LoadingContainer>
        <Skeleton />
      )}
    </Suspense>
  )
}
