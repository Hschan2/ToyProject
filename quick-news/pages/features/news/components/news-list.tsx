import React, { useCallback } from 'react'
import 'moment/locale/ko'
import dynamic from 'next/dynamic'
import { CommonNewsListProps, NaverNewsProps } from '../../../../types/type'
import useInfiniteScroll from '../../../common/hooks/useInfiniteScroll'
import Skeleton from '../../../common/loading/skeleton'
import Loading from '../../../common/loading/loading'
import useAdditionNews from '@/pages/features/news/hooks/useAdditionNews'

const NewsItem = dynamic(() => import('./news-item'), {
  ssr: false,
  loading: () => <Skeleton />,
})
const RenderNewsPage = dynamic(() => import('./rendered-news'), {
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
