import React, { ReactElement, Suspense, lazy, useCallback, useRef } from 'react'
import useVisibility from '../../hooks/useVisibility'
import { LoadingContainer } from '../../../styles/LoadingStyle'

interface CommonNewsListProps<T> {
  visibleNews: T[] | undefined
  isLoading: boolean
  itemRenderer: (item: T) => ReactElement
}

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
      {!isLoading ? '' : <LoadingContainer>📰Loading...</LoadingContainer>}
    </Suspense>
  )
}
