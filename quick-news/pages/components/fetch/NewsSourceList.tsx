import { useRecoilValue } from 'recoil'
import Link from 'next/link'
import { Suspense, lazy, useRef } from 'react'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/ko'
import { v4 as uuidv4 } from 'uuid'
import { useQuery } from 'react-query'
import { Author, DateOfNews, NewsCard } from '../../../styles/styledComponents'
import {
  NewsApiData,
  NewsSourceListProps,
} from '../../../interfaces/interfaces'
import pageSizeAtom from '../../../constants/pageSizeAtom'
import useVisibility from '../../hooks/useVisibility'

const Loading = lazy(() => import('../page/Loading'))

export default function NewsSourceList(props: NewsSourceListProps) {
  const { category } = props
  const fromToday = new Date().toISOString().split('T')[0]
  const pageSize = useRecoilValue(pageSizeAtom)
  const newsListRef = useRef<HTMLDivElement | null>(null)
  const isVisible = useVisibility(newsListRef)

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

  const { data: articles } = useQuery(
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
    </Suspense>
  )
}
