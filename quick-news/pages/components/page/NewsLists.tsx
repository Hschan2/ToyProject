import { Suspense, lazy, useRef } from 'react'
import 'moment/locale/ko'
import useVisibility from '../../hooks/useVisibility'
import useMoreNews from '../../hooks/useMoreNews'
import MoreViewButton from '../btn/MoreViewButton'
import { MAX_PAGE_COUNT } from '../../../constants/CommonVariable'
import NaverNewsFetch from '../fetch/NaverNewsFetch'

const Loading = lazy(() => import('./Loading'))
const NewsItem = lazy(() => import('./NewsItem'))

export default function NewsLists() {
  const { pageSize, handleLoadMore, isAllLoaded } = useMoreNews()
  const newsListRef = useRef<HTMLDivElement | null>(null)
  const isVisible = useVisibility(newsListRef)
  const { visibleNews, isLoading } = NaverNewsFetch(pageSize)

  return (
    <Suspense fallback={<Loading />}>
      <div ref={newsListRef}>
        {visibleNews?.map(
          (item) => isVisible && <NewsItem key={item.id} item={item} />,
        )}
      </div>
    </Suspense>
  )
}
