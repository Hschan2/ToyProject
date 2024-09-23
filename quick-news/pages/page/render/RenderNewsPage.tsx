import React, { useCallback, useRef } from 'react'
import dynamic from 'next/dynamic'
import { nanoid } from '@reduxjs/toolkit'
import useVisibility from '../../../utils/hooks/useVisibility'
import { CommonNewsListProps } from '../../../utils/types/type'

const Skeleton = dynamic(() => import('../../loading/Skeleton'), { ssr: false })

export default function RenderNewsPage<T>({
  visibleNews,
  itemRenderer,
}: CommonNewsListProps<T>) {
  const newsListRef = useRef<HTMLDivElement | null>(null)
  const isVisible = useVisibility(newsListRef)

  const memoizedItemRenderer = useCallback(
    (item: T) => itemRenderer(item),
    [itemRenderer],
  )

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
