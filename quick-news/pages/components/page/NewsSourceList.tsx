import Link from 'next/link'
import { Suspense, lazy, useRef } from 'react'
import moment from 'moment'
import 'moment/locale/ko'
import { v4 as uuidv4 } from 'uuid'
import { Author, DateOfNews, NewsCard } from '../../../styles/NewsStyle'
import { NewsSourceListProps } from '../../../interfaces/Interfaces'
import useVisibility from '../../hooks/useVisibility'
import useMoreNews from '../../hooks/useMoreNews'
import CategoriesNewsFetch from '../fetch/CategoriesNewsFetch'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'

const Loading = lazy(() => import('./Loading'))

export default function NewsSourceList(props: NewsSourceListProps) {
  const { category } = props
  const { pageSize, handleLoadMore, isAllLoaded } = useMoreNews()
  const newsListRef = useRef<HTMLDivElement | null>(null)
  const isVisible = useVisibility(newsListRef)
  const { visibleNews, isLoading } = CategoriesNewsFetch(category, pageSize)

  useInfiniteScroll({ handleLoadMore, isAllLoaded })

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
      {!isLoading ? '' : '로딩중...'}
    </Suspense>
  )
}
