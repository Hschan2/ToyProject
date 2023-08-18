import { useRecoilValue } from 'recoil'
import { Suspense, lazy, useRef } from 'react'
import Link from 'next/link'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/ko'
import { v4 as uuidv4 } from 'uuid'
import { useQuery } from 'react-query'
import { DateTime, NewsCard } from '../../../styles/styledComponents'
import { NewsData } from '../../../interfaces/interfaces'
import pageSizeAtom from '../../../constants/pageSizeAtom'
import useVisibility from '../../hooks/useVisibility'

const Loading = lazy(() => import('../page/Loading'))

export default function NewsLists() {
  const pageSize = useRecoilValue(pageSizeAtom)
  const newsListRef = useRef<HTMLDivElement | null>(null)
  const isVisible = useVisibility(newsListRef)

  const fetchNews = async (newPageSize: number) => {
    const startTime = performance.now()

    const { data } = await axios.get<NewsData>('/api/naver-news-proxy', {
      params: {
        q: '오늘의주요뉴스',
        pageCount: newPageSize,
      },
    })
    const endTime = performance.now()
    const executionTime = endTime - startTime
    console.log(`${Math.floor(executionTime)}ms`)

    return data.items
  }

  const { data: news } = useQuery(
    ['news', pageSize],
    () => fetchNews(pageSize),
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
    </Suspense>
  )
}
