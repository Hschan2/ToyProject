import { lazy, useCallback } from 'react'
import 'moment/locale/ko'
import useMoreNews from '../../hooks/useMoreNews'
import NaverNewsFetch from '../fetch/NaverNewsFetch'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import RenderNewsPage from './RenderNewsPage'
import { NaverNewsProps } from '../../../interfaces/interface'

const NewsItem = lazy(() => import('./NewsItem'))

export default function NewsLists() {
  const { pageSize, handleLoadMore, isAllLoaded } = useMoreNews()
  const { visibleNews, isLoading } = NaverNewsFetch(pageSize)

  useInfiniteScroll({ handleLoadMore, isAllLoaded })

  const renderNewsItem = (item: NaverNewsProps) => (
    <NewsItem key={item.id} item={item} />
  )

  return (
    <RenderNewsPage
      visibleNews={visibleNews}
      isLoading={isLoading}
      itemRenderer={renderNewsItem}
    />
  )
}
