import moment from 'moment'
import Link from 'next/link'
import React, { Suspense, lazy, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useRecoilValue } from 'recoil'
import { searchState } from '../../../constants/SearchTermState'
import { NewsCard } from '../../../styles/NewsStyle'
import { DateTime } from '../../../styles/InfoStyle'
import useVisibility from '../../hooks/useVisibility'
import useMoreNews from '../../hooks/useMoreNews'
import MoreViewButton from '../btn/MoreViewButton'
import { MAX_PAGE_COUNT } from '../../../constants/CommonVariable'
import NaverNewsFetch from './NaverNewsFetch'

const Loading = lazy(() => import('../page/Loading'))

function SearchNews() {
  const { pageSize, handleLoadMore } = useMoreNews()
  const newsListRef = useRef<HTMLDivElement | null>(null)
  const isVisible = useVisibility(newsListRef)
  const searchTerm = useRecoilValue(searchState)
  const { visibleNews, isLoading } = NaverNewsFetch(pageSize, searchTerm)

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

export default SearchNews
