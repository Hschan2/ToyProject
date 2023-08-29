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

const Loading = lazy(() => import('../page/Loading'))

export default function NewsSourceList(props: NewsSourceListProps) {
  const { category } = props
  const fromToday = new Date().toISOString().split('T')[0]
  const { pageSize, handleLoadMore } = useMoreNews()
  const newsListRef = useRef<HTMLDivElement | null>(null)
  const isVisible = useVisibility(newsListRef)
  const maxPageCount = 40

  const fetchNews = async (
    newPageSize: number,
    newCategory: string | undefined,
  ) => {
    const startTime = performance.now()

    let url = `https://newsapi.org/v2/top-headlines?country=kr&from=${fromToday}&pageSize=${newPageSize}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
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
    ['news', pageSize, category],
    () => fetchNews(pageSize, category),
    {
      refetchOnWindowFocus: false,
    },
  )

  return (
    <Suspense fallback={<Loading />}>
      <div ref={newsListRef}>
        {articles?.map(
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
      {articles && (
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
