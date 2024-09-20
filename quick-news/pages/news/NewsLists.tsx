import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import 'moment/locale/ko'
import useMoreNews from '../../utils/hooks/useMoreNews'
import NaverNewsFetch from '../fetch/NaverNewsFetch'
import useInfiniteScroll from '../../utils/hooks/useInfiniteScroll'
import { CommonNewsListProps, NaverNewsProps } from '../../utils/types/type'
import Loading from '../loading/Loading'
import Skeleton from '../loading/Skeleton'
import axios from 'axios'

const NewsItem = dynamic(() => import('./NewsItem'), {
  ssr: false,
  loading: () => <Skeleton />,
})
const RenderNewsPage = dynamic(() => import('../page/render/RenderNewsPage'), {
  ssr: false,
  loading: () => <Loading />,
}) as React.ComponentType<CommonNewsListProps<NaverNewsProps>>

interface NewsDataProps {
  initialNews: NaverNewsProps[]
  initialPageSize: number
  isAllLoaded: boolean
}

export default function NewsLists({
  initialNews,
  initialPageSize,
  isAllLoaded: serverLoaded,
}: NewsDataProps) {
  const [news, setNews] = useState<NaverNewsProps[]>(initialNews || [])
  const { pageSize, handleLoadMore, isAllLoaded } = useMoreNews(initialPageSize)
  const { visibleNews, isLoading } = NaverNewsFetch(pageSize)
  const targetRef = useInfiniteScroll({ handleLoadMore, isAllLoaded })
  const [allLoaded, setAllLoaded] = useState(serverLoaded)

  useEffect(() => {
    if (visibleNews && visibleNews.length > 0) {
      setNews((prevNews) => [...prevNews, ...visibleNews])
    }
    if (visibleNews && visibleNews.length < pageSize) {
      setAllLoaded(true)
    }
  }, [visibleNews, pageSize])

  const renderNewsItem = (article: NaverNewsProps) => (
    <NewsItem key={article.id} article={article} />
  )

  return (
    <>
      <RenderNewsPage
        visibleNews={news}
        isLoading={isLoading}
        itemRenderer={renderNewsItem}
      />
      {!allLoaded && <div ref={targetRef}></div>}
    </>
  )
}

export const getServerSideProps: GetServerSideProps<NewsDataProps> = async (
  context,
) => {
  const pageSize = 10
  const queryValue = '오늘의주요뉴스'
  try {
    const { data } = await axios.get('/api/naver-news-proxy', {
      params: {
        q: queryValue,
        pageCount: pageSize,
      },
      headers: {
        'X-Naver-Client-Id': process.env.NEXT_PUBLIC_CLIENT_ID,
        'X-Naver-Client-Secret': process.env.NEXT_PUBLIC_CLIENT_SECRET,
      },
    })
    return {
      props: {
        initialNews: data.items,
        initialPageSize: pageSize,
        isAllLoaded: data.items.length < pageSize,
      },
    }
  } catch (error) {
    console.error('뉴스 데이터 가져오기 실패', error)
    return {
      props: {
        initialNews: [],
        initialPageSize: pageSize,
        isAllLoaded: true,
      },
    }
  }
}
