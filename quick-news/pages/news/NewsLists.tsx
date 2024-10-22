import React, { useCallback } from 'react'
import 'moment/locale/ko'
import dynamic from 'next/dynamic'
import { CommonNewsListProps, NaverNewsProps } from '../../types/type'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import Skeleton from '../loading/Skeleton'
import Loading from '../loading/Loading'
import useAdditionNews from '@/hooks/useAdditionNews'

const NewsItem = dynamic(() => import('./NewsItem'), {
  ssr: false,
  loading: () => <Skeleton />,
})
const RenderNewsPage = dynamic(() => import('../page/render/RenderNewsPage'), {
  ssr: false,
  loading: () => <Loading />,
}) as React.ComponentType<CommonNewsListProps<NaverNewsProps>>

interface NewsProps {
  newsData: NaverNewsProps[]
}

export default function NewsLists({ newsData }: NewsProps) {
  const { visibleNews, loadMoreNews, hasMoreNews } = useAdditionNews(
    newsData,
    10,
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
