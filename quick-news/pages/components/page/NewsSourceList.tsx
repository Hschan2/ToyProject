import { Suspense, lazy, useRef } from 'react'
import 'moment/locale/ko'
import { NewsSourceListProps } from '../../../interfaces/Interfaces'
import useVisibility from '../../hooks/useVisibility'
import useMoreNews from '../../hooks/useMoreNews'
import CategoriesNewsFetch from '../fetch/CategoriesNewsFetch'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import { LoadingContainer } from '../../../styles/LoadingStyle'
import NewsCategoryItem from './NewsCategoryItem'

const Loading = lazy(() => import('./Loading'))

export default function NewsSourceList(props: NewsSourceListProps) {
  const { category } = props
  const { pageSize, handleLoadMore, isAllLoaded } = useMoreNews()
  const newsListRef = useRef<HTMLDivElement | null>(null)
  const isVisible = useVisibility(newsListRef)
  const { visibleNews, isLoading } = CategoriesNewsFetch(category, pageSize)

  useInfiniteScroll({ handleLoadMore, isAllLoaded })

  return (
    <Suspense fallback={<Loading />}>
      <div ref={newsListRef}>
        {visibleNews?.map(
          (article) =>
            isVisible && (
              <NewsCategoryItem key={article.id} article={article} />
            ),
        )}
      </div>
      {!isLoading ? '' : <LoadingContainer>📰불러오는 중...</LoadingContainer>}
    </Suspense>
  )
}
