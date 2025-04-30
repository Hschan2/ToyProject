import React, { lazy } from 'react'
import dynamic from 'next/dynamic'
import useMoreNews from '../../../hooks/news/useMoreNews'
import NaverNewsFetch from '../../../lib/news/naver-news-fetch'
import useInfiniteScroll from '../../../hooks/useInfiniteScroll'
import { CommonNewsListProps, BasicNewsProps } from '../../../types/type'
import Loading from '../../../components/loading/loading'
import { useSearchQuery } from '../hooks/useSearchQuery'

const NewsItem = lazy(() => import('../../../components/news/news-item'))
const RenderNewsPage = dynamic(
  () => import('../../../components/news/rendered-news'),
  {
    ssr: false,
    loading: () => <Loading />,
  },
) as React.ComponentType<CommonNewsListProps<BasicNewsProps>>

export default function SearchNews() {
  const { searchValue } = useSearchQuery()
  const { pageSize, handleLoadMore, isAllLoaded } = useMoreNews()
  const { visibleNews } = NaverNewsFetch(pageSize, searchValue)
  const targetRef = useInfiniteScroll({ handleLoadMore, isAllLoaded })

  const renderNewsItem = (article: BasicNewsProps) => (
    <NewsItem key={article.id} article={article} />
  )

  return (
    <>
      <RenderNewsPage visibleNews={visibleNews} itemRenderer={renderNewsItem} />
      {!isAllLoaded && <div ref={targetRef} />}
    </>
  )
}
