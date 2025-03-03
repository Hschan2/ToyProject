import React, { lazy } from 'react'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import useMoreNews from '../../news/hooks/useMoreNews'
import NaverNewsFetch from '../../news/fetch/naver-news-fetch'
import useInfiniteScroll from '../../../common/hooks/useInfiniteScroll'
import { CommonNewsListProps, NaverNewsProps } from '../../../../types/type'
import Loading from '../../../common/loading/loading'

const NewsItem = lazy(() => import('../../news/components/news-item'))
const RenderNewsPage = dynamic(() => import('../../news/components/rendered-news'), {
  ssr: false,
  loading: () => <Loading />,
}) as React.ComponentType<CommonNewsListProps<NaverNewsProps>>

export default function SearchNews() {
  const { pageSize, handleLoadMore, isAllLoaded } = useMoreNews()
  const searchParams = useSearchParams()
  const searchedValue =
    searchParams.get('q') ||
    (typeof window !== 'undefined' && localStorage.getItem('searchValue')) ||
    ''
  const { visibleNews } = NaverNewsFetch(pageSize, searchedValue)
  const targetRef = useInfiniteScroll({ handleLoadMore, isAllLoaded })

  const renderNewsItem = (article: NaverNewsProps) => (
    <NewsItem key={article.id} article={article} />
  )

  return (
    <>
      <RenderNewsPage visibleNews={visibleNews} itemRenderer={renderNewsItem} />
      {!isAllLoaded && <div ref={targetRef}></div>}
    </>
  )
}
