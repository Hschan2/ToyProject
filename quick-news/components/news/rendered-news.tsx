import React, { lazy, useCallback, useRef } from 'react'
import dynamic from 'next/dynamic'
import { nanoid } from '@reduxjs/toolkit'
import { CommonNewsListProps } from '../../types/type'
import useVisibility from '../../hooks/useVisibility'

const Skeleton = dynamic(() => import('../loading/skeleton'), {
  ssr: false,
})
const NoDataPage = lazy(() => import('../error/no-data-page'))

function RenderNewsPage<T>({
  visibleNews,
  itemRenderer,
}: CommonNewsListProps<T>) {
  const newsListRef = useRef<HTMLDivElement | null>(null)
  const isVisible = useVisibility(newsListRef)

  const memoizedItemRenderer = useCallback(
    (item: T) => itemRenderer(item),
    [itemRenderer],
  )

  if (visibleNews?.length === 0) return <NoDataPage />

  return (
    <div ref={newsListRef}>
      {visibleNews?.length ? (
        visibleNews?.map((item) => (
          <React.Fragment key={nanoid()}>
            {isVisible && memoizedItemRenderer(item)}
          </React.Fragment>
        ))
      ) : (
        <Skeleton />
      )}
    </div>
  )
}

export default RenderNewsPage
