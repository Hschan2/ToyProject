import { useCallback } from 'react'
import dynamic from 'next/dynamic'
import 'moment/locale/ko'
import {
  CommonNewsListProps,
  NewsSourceListProps,
  BasicNewsProps,
} from '../../types/type'
import useMoreNews from '../../hooks/news/useMoreNews'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import Skeleton from '../loading/skeleton'
import Loading from '../loading/loading'
import useCategoriesNewsFetch from '../../lib/news/fetch-categories-news-data'
import RecommendedNews from './recommended-news'

const NewsCategoryItem = dynamic(() => import('./category-news-item'), {
  loading: () => <Skeleton />,
  ssr: true,
})
const RenderNewsPage = dynamic(() => import('./rendered-news'), {
  loading: () => <Loading />,
  ssr: false,
}) as React.ComponentType<CommonNewsListProps<BasicNewsProps>>

export default function NewsSourceList({ category }: NewsSourceListProps) {
  const { pageSize, handleLoadMore, isAllLoaded } = useMoreNews()
  const { visibleNews, isLoading, articles } = useCategoriesNewsFetch(
    category,
    pageSize,
  )
  const targetRef = useInfiniteScroll({ handleLoadMore, isAllLoaded })

  const renderNewsItem = useCallback(
    (article: BasicNewsProps) => (
      <NewsCategoryItem key={article.id} article={article} />
    ),
    [],
  )

  if (isLoading) return <Loading />

  return (
    <>
      <RecommendedNews newsList={articles} sourceType="category" />
      <RenderNewsPage visibleNews={visibleNews} itemRenderer={renderNewsItem} />
      {!isAllLoaded && <div ref={targetRef} />}
    </>
  )
}
