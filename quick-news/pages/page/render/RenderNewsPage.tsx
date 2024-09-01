import React, { useCallback, useRef } from 'react'
import dynamic from 'next/dynamic'
import useVisibility from '../../../utils/hooks/useVisibility'
import { CommonNewsListProps } from '../../../utils/types/type'

const Skeleton = dynamic(() => import('../../loading/Skeleton'), { ssr: false })

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
    <div ref={newsListRef}>
      {isLoading ? (
        <Skeleton />
      ) : (
        visibleNews?.map((item, index) => (
          <React.Fragment key={index}>
            {isVisible && memoizedItemRenderer(item)}
          </React.Fragment>
        ))
      )}
    </div>
  )
}
