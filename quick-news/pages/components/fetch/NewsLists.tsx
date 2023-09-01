import { Suspense, lazy, useRef } from 'react'
import Link from 'next/link'
import moment from 'moment'
import 'moment/locale/ko'
import { v4 as uuidv4 } from 'uuid'
import { NewsCard } from '../../../styles/NewsStyle'
import { DateTime } from '../../../styles/InfoStyle'
import useVisibility from '../../hooks/useVisibility'
import useMoreNews from '../../hooks/useMoreNews'
import MoreViewButton from '../btn/MoreViewButton'
import { MAX_PAGE_COUNT } from '../../../constants/CommonVariable'
import NaverNewsFetch from './NaverNewsFetch'

const Loading = lazy(() => import('../page/Loading'))

export default function NewsLists() {
  const { pageSize, handleLoadMore } = useMoreNews()
  const newsListRef = useRef<HTMLDivElement | null>(null)
  const isVisible = useVisibility(newsListRef)
  const { visibleNews, isLoading } = NaverNewsFetch(pageSize)

  return (
    <Suspense fallback={<Loading />}>
      <div ref={newsListRef}>
        {visibleNews?.map(
          (item) =>
            isVisible && (
              <Link href={item.link} target="_blank" key={uuidv4()}>
                <NewsCard>
                  <h3 dangerouslySetInnerHTML={{ __html: item.title }} />
                  <DateTime>
                    {moment(item.pubDate).format('YYYY-MM-DD HH:mm')}
                  </DateTime>
                  <p dangerouslySetInnerHTML={{ __html: item.description }} />
                </NewsCard>
              </Link>
            ),
        )}
      </div>
      {!isLoading && (
        <MoreViewButton
          onClick={handleLoadMore}
          disabled={isLoading || pageSize >= MAX_PAGE_COUNT}
        >
          더보기
        </MoreViewButton>
      )}
    </Suspense>
  )
}
