import React, { Suspense, lazy, useCallback, useRef } from 'react'
import useVisibility from '../utils/hooks/useVisibility'
import { CommonNewsListProps } from '../utils/types/type'
import Skeleton from './loading/Skeleton'

const Loading = lazy(() => import('./loading/Loading'))

export default function RenderNewsPage<T>({
  visibleNews,
  isLoading,
  itemRenderer,
}: CommonNewsListProps<T>) {
  const newsListRef = useRef<HTMLDivElement | null>(null)
  const isVisible = useVisibility(newsListRef)

  const memoizedItemRenderer = useCallback(
    (item: T) => itemRenderer(item),
    [itemRenderer],
  )

  return (
    <Suspense fallback={<Loading />}>
      <div ref={newsListRef}>
        {visibleNews?.map((item, index) => (
          <React.Fragment key={index}>
            {isVisible && memoizedItemRenderer(item)}
          </React.Fragment>
        ))}
      </div>
      {!isLoading ? '' : <Skeleton />}
    </Suspense>
  )
}
