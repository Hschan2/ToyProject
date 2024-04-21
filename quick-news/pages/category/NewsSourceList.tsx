import { lazy } from 'react'
import 'moment/locale/ko'
import { CategoryNewsProps, NewsSourceListProps } from '../../utils/types/type'
import useMoreNews from '../../utils/hooks/useMoreNews'
import CategoriesNewsFetch from '../fetch/CategoriesNewsFetch'
import useInfiniteScroll from '../../utils/hooks/useInfiniteScroll'
import RenderNewsPage from '../page/render/RenderNewsPage'

const NewsCategoryItem = lazy(() => import('./NewsCategoryItem'))

export default function NewsSourceList(props: NewsSourceListProps) {
  const { category } = props
  const { pageSize, handleLoadMore, isAllLoaded } = useMoreNews()
  const { visibleNews, isLoading } = CategoriesNewsFetch(category, pageSize)

  useInfiniteScroll({ handleLoadMore, isAllLoaded })

  const renderNewsItem = (article: CategoryNewsProps) => (
    <NewsCategoryItem key={article.id} article={article} />
  )

  return (
    <RenderNewsPage
      visibleNews={visibleNews}
      isLoading={isLoading}
      itemRenderer={renderNewsItem}
    />
  )
}
