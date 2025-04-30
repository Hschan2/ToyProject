import React, { useCallback } from 'react'
import 'moment/locale/ko'
import dynamic from 'next/dynamic'
import { CommonNewsListProps, BasicNewsProps } from '../../types/type'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import Skeleton from '../loading/skeleton'
import Loading from '../loading/loading'
import useAdditionNews from '../../hooks/news/useAdditionNews'

const NewsItem = dynamic(() => import('./news-item'), {
  ssr: false,
  loading: () => <Skeleton />,
})
const RenderNewsPage = dynamic(() => import('./rendered-news'), {
  ssr: false,
  loading: () => <Loading />,
}) as React.ComponentType<CommonNewsListProps<BasicNewsProps>>

interface NewsProps {
  newsData: BasicNewsProps[]
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
    (article: BasicNewsProps) => (
      <NewsItem key={article.id} article={article} />
    ),
    [],
  )

  return (
    <>
      <RenderNewsPage visibleNews={visibleNews} itemRenderer={renderNewsItem} />
      {hasMoreNews && <div ref={targetRef} />}
    </>
  )
}
