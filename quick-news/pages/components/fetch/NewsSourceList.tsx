import { useRecoilValue } from 'recoil'
import Link from 'next/link'
import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/ko'
import { v4 as uuidv4 } from 'uuid'
import { Author, DateOfNews, NewsCard } from '../../../styles/styledComponents'
import {
  NewsApiData,
  NewsApiItems,
  NewsSourceListProps,
} from '../../../interfaces/interfaces'
import pageSizeAtom from '../../../constants/pageSizeAtom'
import useVisibility from '../../hooks/useVisibility'

const Loading = lazy(() => import('../page/Loading'))

export default function NewsSourceList(props: NewsSourceListProps) {
  const [articles, setArticles] = useState<NewsApiItems[]>([])
  const { category } = props
  const fromToday = new Date().toISOString().split('T')[0]
  const pageSize = useRecoilValue(pageSizeAtom)
  const newsListRef = useRef<HTMLDivElement | null>(null)
  const isVisible = useVisibility(newsListRef)

  useEffect(() => {
    const cancelToken = axios.CancelToken.source()

    async function fetchNews() {
      try {
        const startTime = performance.now()

        let url = `https://newsapi.org/v2/top-headlines?country=kr&from=${fromToday}&pageSize=${pageSize}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
        if (category) {
          url += `&category=${category}`
        }

        const response = await axios.get<NewsApiData>(url, {
          cancelToken: cancelToken.token,
        })
        setArticles(response.data.articles)

        const endTime = performance.now()
        const executionTime = endTime - startTime

        console.log(`${Math.floor(executionTime)}ms`)
      } catch (error) {
        console.error(error)
        if (axios.isCancel(error)) {
          console.log('요청 취소')
        }
      }
    }

    fetchNews()

    return () => {
      cancelToken.cancel()
    }
  }, [category, pageSize])

  return (
    <Suspense fallback={<Loading />}>
      <div ref={newsListRef}>
        {articles
          .filter((article) => isVisible)
          .map((article) => (
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
          ))}
      </div>
    </Suspense>
  )
}
