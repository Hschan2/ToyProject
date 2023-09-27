import { Suspense, lazy, useRef } from 'react'
import 'moment/locale/ko'
import useVisibility from '../../hooks/useVisibility'
import useMoreNews from '../../hooks/useMoreNews'
import NaverNewsFetch from '../fetch/NaverNewsFetch'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'

const Loading = lazy(() => import('./Loading'))
const NewsItem = lazy(() => import('./NewsItem'))

export default function NewsLists() {
  const { pageSize, handleLoadMore, isAllLoaded } = useMoreNews()
  const newsListRef = useRef<HTMLDivElement | null>(null)
  const isVisible = useVisibility(newsListRef)
  const { visibleNews, isLoading } = NaverNewsFetch(pageSize)

  useInfiniteScroll({ handleLoadMore, isAllLoaded })

  return (
    <Suspense fallback={<Loading />}>
      <div ref={newsListRef}>
        {visibleNews?.map(
          (item) => isVisible && <NewsItem key={item.id} item={item} />,
        )}
      </div>
      {!isLoading ? '' : '로딩중...'}
    </Suspense>
  )
}
