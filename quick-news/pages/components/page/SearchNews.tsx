import React, { lazy } from 'react'
import { useSearchParams } from 'next/navigation'
import useMoreNews from '../../hooks/useMoreNews'
import NaverNewsFetch from '../fetch/NaverNewsFetch'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import { NaverNewsProps } from '../../../interfaces/interface'
import RenderNewsPage from './RenderNewsPage'

const NewsItem = lazy(() => import('./NewsItem'))

export default function SearchNews() {
  const { pageSize, handleLoadMore, isAllLoaded } = useMoreNews()
  const searchParams = useSearchParams()
  const searchedValue =
    searchParams.get('q') ||
    (typeof window !== 'undefined' && localStorage.getItem('searchValue')) ||
    ''
  const { visibleNews, isLoading } = NaverNewsFetch(pageSize, searchedValue)

  useInfiniteScroll({ handleLoadMore, isAllLoaded })

  const renderNewsItem = (article: NaverNewsProps) => (
    <NewsItem key={article.id} article={article} />
  )

  return (
    <RenderNewsPage
      visibleNews={visibleNews}
      isLoading={isLoading}
      itemRenderer={renderNewsItem}
    />
  )
}
