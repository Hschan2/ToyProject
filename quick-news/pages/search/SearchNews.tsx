import React, { lazy } from 'react'
import { useSearchParams } from 'next/navigation'
import useMoreNews from '../../utils/hooks/useMoreNews'
import NaverNewsFetch from '../fetch/NaverNewsFetch'
import useInfiniteScroll from '../../utils/hooks/useInfiniteScroll'
import { NaverNewsProps } from '../../utils/types/type'
import RenderNewsPage from '../page/render/RenderNewsPage'

const NewsItem = lazy(() => import('../news/NewsItem'))

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
