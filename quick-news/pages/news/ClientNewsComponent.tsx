import React, { useCallback } from 'react'
import dynamic from 'next/dynamic'
import { CommonNewsListProps, NaverNewsProps } from '../../utils/types/type'
import useAdditionNews from '../../utils/hooks/useAdditionNews'
import useInfiniteScroll from '../../utils/hooks/useInfiniteScroll'
import Skeleton from '../loading/Skeleton'
import Loading from '../loading/Loading'

const NewsItem = dynamic(() => import('./NewsItem'), {
  ssr: false,
  loading: () => <Skeleton />,
})
const RenderNewsPage = dynamic(() => import('../page/render/RenderNewsPage'), {
  ssr: false,
  loading: () => <Loading />,
}) as React.ComponentType<CommonNewsListProps<NaverNewsProps>>

interface ClientNewsProps {
  initialNews: NaverNewsProps[]
  initialPageSize: number
}
function ClientNewsComponent({
  initialNews,
  initialPageSize,
}: ClientNewsProps) {
  const { visibleNews, loadMoreNews, hasMoreNews } = useAdditionNews(
    initialNews,
    initialPageSize,
  )
  const targetRef = useInfiniteScroll({
    handleLoadMore: loadMoreNews,
    isAllLoaded: !hasMoreNews,
  })

  const renderNewsItem = useCallback(
    (article: NaverNewsProps) => (
      <NewsItem key={article.id} article={article} />
    ),
    [],
  )

  return (
    <>
      <RenderNewsPage visibleNews={visibleNews} itemRenderer={renderNewsItem} />
      {hasMoreNews && <div ref={targetRef}></div>}
    </>
  )
}

export default ClientNewsComponent
