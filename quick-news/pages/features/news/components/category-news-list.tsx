import { useCallback } from 'react'
import dynamic from 'next/dynamic'
import 'moment/locale/ko'
import {
  CategoryNewsProps,
  CommonNewsListProps,
  NewsSourceListProps,
} from '../../../../types/type'
import useMoreNews from '../hooks/useMoreNews'
import useInfiniteScroll from '../../../common/hooks/useInfiniteScroll'
import Skeleton from '../../../common/loading/skeleton'
import Loading from '../../../common/loading/loading'
import useCategoriesNewsFetch from '../fetch/fetch-categories-news-data'

const NewsCategoryItem = dynamic(() => import('./category-news-item'), {
  ssr: false,
  loading: () => <Skeleton />,
})
const RenderNewsPage = dynamic(() => import('./rendered-news'), {
  ssr: false,
  loading: () => <Loading />,
}) as React.ComponentType<CommonNewsListProps<CategoryNewsProps>>

export default function NewsSourceList(props: NewsSourceListProps) {
  const { category } = props
  const { pageSize, handleLoadMore, isAllLoaded } = useMoreNews()
  const { visibleNews } = useCategoriesNewsFetch(category, pageSize)
  const targetRef = useInfiniteScroll({ handleLoadMore, isAllLoaded })

  const renderNewsItem = useCallback(
    (article: CategoryNewsProps) => (
      <NewsCategoryItem key={article.id} article={article} />
    ),
    [],
  )

  return (
    <>
      <RenderNewsPage visibleNews={visibleNews} itemRenderer={renderNewsItem} />
      {!isAllLoaded && <div ref={targetRef}></div>}
    </>
  )
}
