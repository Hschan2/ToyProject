import { lazy } from 'react'
import dynamic from 'next/dynamic'
import 'moment/locale/ko'
import {
  CategoryNewsProps,
  CommonNewsListProps,
  NewsSourceListProps,
} from '../../utils/types/type'
import useMoreNews from '../../utils/hooks/useMoreNews'
import CategoriesNewsFetch from '../fetch/CategoriesNewsFetch'
import useInfiniteScroll from '../../utils/hooks/useInfiniteScroll'

const NewsCategoryItem = lazy(() => import('./NewsCategoryItem'))
const RenderNewsPage = dynamic(() => import('../page/render/RenderNewsPage'), {
  ssr: false,
}) as React.ComponentType<CommonNewsListProps<CategoryNewsProps>>

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
