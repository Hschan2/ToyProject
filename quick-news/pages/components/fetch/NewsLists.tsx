import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/ko'
import { v4 as uuidv4 } from 'uuid'
import { DateTime, NewsCard } from '../../../styles/styledComponents'
import { NewsData, NewsItem } from '../../../interfaces/interfaces'
import useVisibility from '../../hooks/useVisibility'

const Loading = lazy(() => import('../page/Loading'))

export default function NewsLists() {
  const [news, setNews] = useState<NewsItem[]>([])
  const newsListRef = useRef<HTMLDivElement | null>(null)
  const isVisible = useVisibility(newsListRef)

  useEffect(() => {
    const cancelToken = axios.CancelToken.source()

    async function fetchNews() {
      try {
        const startTime = performance.now()

        const { data } = await axios.get<NewsData>('/api/naver-news-proxy', {
          params: {
            q: '오늘의주요뉴스',
          },
          cancelToken: cancelToken.token,
        })
        setNews(data.items)

        const endTime = performance.now()
        const executionTime = endTime - startTime

        console.log(`${Math.floor(executionTime)}ms`)
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('요청 취소')
        } else {
          console.error(error)
        }
      }
    }

    fetchNews()

    return () => {
      cancelToken.cancel()
    }
  }, [])

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
