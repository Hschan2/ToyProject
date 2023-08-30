import Link from 'next/link'
import { Suspense, lazy, useRef } from 'react'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/ko'
import { v4 as uuidv4 } from 'uuid'
import { useQuery } from 'react-query'
import { Author, DateOfNews, NewsCard } from '../../../styles/NewsStyle'
import {
  NewsApiData,
  NewsSourceListProps,
} from '../../../interfaces/interfaces'
import useVisibility from '../../hooks/useVisibility'
import useMoreNews from '../../hooks/useMoreNews'
import MoreViewButton from '../btn/MoreViewButton'
import { MAX_PAGE_COUNT } from '../../../constants/CommonVariable'

const Loading = lazy(() => import('../page/Loading'))

export default function NewsSourceList(props: NewsSourceListProps) {
  const { category } = props
  const fromToday = new Date().toISOString().split('T')[0]
  const { pageSize, handleLoadMore } = useMoreNews()
  const newsListRef = useRef<HTMLDivElement | null>(null)
  const isVisible = useVisibility(newsListRef)

  const fetchNews = async (newCategory: string | undefined) => {
    const startTime = performance.now()

    let url = `https://newsapi.org/v2/top-headlines?country=kr&from=${fromToday}&pageSize=${MAX_PAGE_COUNT}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
    if (newCategory) {
      url += `&category=${newCategory}`
    }

    const response = await axios.get<NewsApiData>(url)

    const endTime = performance.now()
    const executionTime = endTime - startTime
    console.log(`${Math.floor(executionTime)}ms`)

    return response.data.articles
  }

  const { data: articles, isLoading } = useQuery(
    ['news', category],
    () => fetchNews(category),
    {
      refetchOnWindowFocus: false,
    },
  )

  const visibleNews = articles?.slice(0, pageSize)

  return (
    <Suspense fallback={<Loading />}>
      <div ref={newsListRef}>
        {visibleNews?.map(
          (article) =>
            isVisible && (
              <Link href={article.url} target="_blank" key={uuidv4()}>
                <NewsCard>
                  <h3>{article.title.split(' - ')[0]}</h3>
                  <DateOfNews>
                    {moment(article.publishedAt).format('YYYY-MM-DD HH:mm')}
                  </DateOfNews>
                  <Author>{article.author}</Author>
                  <p>{article.description ?? ''}</p>
                </NewsCard>
              </Link>
            ),
        )}
      </div>
      {visibleNews && (
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
