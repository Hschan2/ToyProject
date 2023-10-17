import React, { lazy, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import useMoreNews from '../../hooks/useMoreNews'
import NaverNewsFetch from '../fetch/NaverNewsFetch'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import { NaverNewsProps } from '../../../interfaces/Interfaces'
import RenderNewsPage from './RenderNewsPage'

const NewsItem = lazy(() => import('./NewsItem'))

export default function SearchNews() {
  const { pageSize, handleLoadMore, isAllLoaded } = useMoreNews()
  const searchParams = useSearchParams()
  const searchedValue = searchParams.get('q') || ''
  const { visibleNews, isLoading } = NaverNewsFetch(pageSize, searchedValue)

  useInfiniteScroll({ handleLoadMore, isAllLoaded })

  const renderNewsItem = useCallback(
    (item: NaverNewsProps) => <NewsItem key={item.id} item={item} />,
    [],
  )

  return (
    <RenderNewsPage
      visibleNews={visibleNews}
      isLoading={isLoading}
      itemRenderer={renderNewsItem}
    />
  )
}
