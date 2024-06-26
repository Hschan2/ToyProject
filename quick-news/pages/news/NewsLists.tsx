import { lazy } from 'react'
import 'moment/locale/ko'
import useMoreNews from '../../utils/hooks/useMoreNews'
import NaverNewsFetch from '../fetch/NaverNewsFetch'
import useInfiniteScroll from '../../utils/hooks/useInfiniteScroll'
import RenderNewsPage from '../page/render/RenderNewsPage'
import { NaverNewsProps } from '../../utils/types/type'

const NewsItem = lazy(() => import('./NewsItem'))

export default function NewsLists() {
  const { pageSize, handleLoadMore, isAllLoaded } = useMoreNews()
  const { visibleNews, isLoading } = NaverNewsFetch(pageSize)

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
