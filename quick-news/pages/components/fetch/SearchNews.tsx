import axios from 'axios'
import moment from 'moment'
import Link from 'next/link'
import React, { Suspense, lazy, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { useQuery } from 'react-query'
import { v4 as uuidv4 } from 'uuid'
import { searchState } from '../../../constants/SearchTermState'
import { NewsCard } from '../../../styles/NewsStyle'
import { DateTime } from '../../../styles/InfoStyle'
import { NewsData } from '../../../interfaces/interfaces'
import useVisibility from '../../hooks/useVisibility'
import useMoreNews from '../../hooks/useMoreNews'
import MoreViewButton from '../btn/MoreViewButton'

const Loading = lazy(() => import('../page/Loading'))

function SearchNews() {
  const { pageSize, handleLoadMore } = useMoreNews()
  const searchTerm = useRecoilValue(searchState)
  const newsListRef = useRef<HTMLDivElement | null>(null)
  const isVisible = useVisibility(newsListRef)
  const maxPageCount = 40

  const fetchSearch = async (newPageSize: number) => {
    const { data } = await axios.get<NewsData>(`/api/naver-news-proxy`, {
      params: {
        q: searchTerm,
        pageCount: newPageSize,
      },
    })

    return data.items
  }

  const { data: news, isLoading } = useQuery(
    ['news', pageSize],
    () => fetchSearch(pageSize),
    {
      refetchOnWindowFocus: false,
    },
  )

  return (
    <Suspense fallback={<Loading />}>
      <div ref={newsListRef}>
        {news?.map(
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
      {news && (
        <MoreViewButton
          onClick={handleLoadMore}
          disabled={isLoading || pageSize >= maxPageCount}
        >
          더보기
        </MoreViewButton>
      )}
    </Suspense>
  )
}

export default SearchNews
