import React, { lazy } from 'react'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import useMoreNews from '../../utils/hooks/useMoreNews'
import NaverNewsFetch from '../fetch/NaverNewsFetch'
import useInfiniteScroll from '../../utils/hooks/useInfiniteScroll'
import { CommonNewsListProps, NaverNewsProps } from '../../utils/types/type'
import Loading from '../loading/Loading'

const NewsItem = lazy(() => import('../news/NewsItem'))
const RenderNewsPage = dynamic(() => import('../page/render/RenderNewsPage'), {
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
